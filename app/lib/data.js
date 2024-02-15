import { kv } from '@vercel/kv';
import prisma from './prisma'
import {RedisCache, UpdateCache, AppendCache, RemoveCache} from './vercelKV';

// Fetching Data
export const fetchTrainees = async () => {
    return await RedisCache('trainees', async () => {
        const res = await prisma.trainee.findMany({
            orderBy: {id: 'asc'},
            include: {
                sessions: {
                    select:{
                        duration: true,
                        createdAt: true,
                        private: true,
                    },
                    orderBy: {id: 'desc'}
                },
                payments: {
                    select:{
                        amount: true,
                        createdAt: true
                    }
                },
                program: true,
                special: true,
                private: true,
                coach: true
            },
        })
        return res;
    })
    
}

export const fetchCoaches = async () => {
    return await RedisCache('coaches', async () => {
        const res = await prisma.coach.findMany({
            orderBy: {id: 'asc'},
            include: {
                _count: {
                    select:{ 
                        trainees: true, 
                        sessions: true,
                    },
                },
            },
        })
        return res;
    }, 24)

}

export const fetchPayments = async () => {
    return await RedisCache('payments', async () => {
        const res = await prisma.payment.findMany({
            orderBy: {id: 'desc'},
            include: {
                trainee: {
                    select:{
                        fname: true,
                        mname: true,
                        lname: true
                    },
                }
            },
        })
        return res;
    })
}

export const fetchSessions = async () => {
    return await RedisCache('sessions', async () => {
        const res = await prisma.session.findMany({
            orderBy: {id: 'desc'},
            take: 100,
            include: {
                trainee: {
                    select:{
                        fname: true,
                        mname: true,
                        lname: true
                    },
                },
                coach: {
                    select:{
                        fname: true,
                        mname: true,
                        lname: true
                    },
                }
            },
        })
        return res;
    })
}

export const fetchMessages = async () => {
    return await RedisCache('messages', async () => {
        const res = await prisma.message.findMany({
            orderBy: {id: 'desc'},
        })
        return res;
    })

}

export const fetchPrograms = async () => {
    return await RedisCache('programs', async () => {
        const res = await prisma.program.findMany({
            orderBy: {id: 'asc'},
            include: {
                _count: {
                    select: {
                        trainees: true,
                        private_trainees: true,
                        special_trainees: true
                    }
                }
            },
        })
        return res;
    }, 24)
}

export const fetchTestimonials = async () => {
    return await RedisCache('testimonials', async () => {
        const res = await prisma.testimonial.findMany({
            orderBy: {id: 'asc'},
        })
        return res;
    }, 24)
}

export const fetchSettings = async () => {
    return await RedisCache('settings', async () => {
        const settings = await prisma.settings.findUnique({
            where: {
                id: 1,
            },
            include: {
                testimonials: true,
            }
        })
        return settings
    }, 24)
}

// Creating Data
export const createTrainee = async (data) => {
    const newTrainee = await prisma.trainee.create({
        data: data,
        include: {
            sessions: {
                select:{
                    duration: true,
                    createdAt: true,
                    private: true,

                },
                orderBy: {id: 'desc'}
            },
            payments: {
                select:{
                    amount: true,
                    createdAt: true
                }
            },
            program: true,
            special: true,
            private: true,
            coach: true
        },
      })

    await AppendCache('trainees', newTrainee)
    return newTrainee
}

export const createMessage = async (data) => {
    const newMessage = await prisma.message.create({
        data: data,
      })

    await AppendCache('messages', newMessage)
    return newMessage
}

export const createCoach = async (data) => {
    const newCoach = await prisma.coach.create({
        data: data,
        include: {
            _count: {
                select:{ 
                    trainees: true, 
                    sessions: true,
                },
            },
        },
      })
    
    await AppendCache('coaches', newCoach, 'right')
    return newCoach
}

export const createTestimonial = async (data) => {
    const newTestimonial = await prisma.testimonial.create({
        data: data,
      })
    await AppendCache('testimonials', newTestimonial)
    return newTestimonial
}

export const addPayment = async (data) => {
    const newPayment = await prisma.payment.create({data: data})
    if (data.renew) await editTrainee({id: data.id, basic_start: data.createdAt})
    await AppendCache('payments', newPayment)
    return newPayment
}

export const addSession = async (data) => {
    const newSession = await prisma.session.create({
        data: data,
        include: {
            trainee: {
                select:{
                    fname: true,
                    mname: true,
                    lname: true
                },
            },
            coach: {
                select:{
                    fname: true,
                    mname: true,
                    lname: true
                },
            }
        },
      })
    await AppendCache('sessions', newSession, 'right')
    return newSession
}

export const createProgram = async (data) => {
    const newProgram = await prisma.program.create({
        data: data,
        include: {
            _count: {
                select:{ 
                    trainees: true, 
                    private_trainees: true,
                    special_trainees: true
                },
            },
        },

      })
    await AppendCache('programs', newProgram)
    return newProgram
}

// Deleting Data
export const deleteTrainee = async (id) => {
    const deletedTrainee = await prisma.trainee.delete({
        where: {
            id: parseInt(id)
        },
        include: {
            sessions: {
                select:{
                    duration: true,
                    createdAt: true,
                    private: true,
                },
                orderBy: {id: 'desc'}
            },
            payments: {
                select:{
                    amount: true,
                    createdAt: true
                }
            },
            program: true,
            special: true,
            private: true,
            coach: true
        },
    })

    await RemoveCache('trainees', deletedTrainee)
    return deletedTrainee
} 

export const deleteCoach = async (id) => {
    const deletedCoach = await prisma.coach.delete({
        where: {
            id: parseInt(id)
        },
        include: {
            _count: {
                select:{ 
                    trainees: true, 
                    sessions: true,
                },
            },
        },
    })
    await RemoveCache('coaches', deletedCoach)
    return deletedCoach
}

export const deleteTestimonial = async (id) => {
    const deletedTestimonial = await prisma.testimonial.delete({
        where: {
            id: parseInt(id)
        },
    })
    await RemoveCache('testimonials', deletedTestimonial)
    return deletedTestimonial
}

export const deleteMessage = async (id) => {
    const deletedMessage = await prisma.message.delete({
        where: {
            id: parseInt(id)
        },
    })
    await RemoveCache('messages', deletedMessage)
    return deletedMessage
}

export const deleteSession = async (id) => {
    const deletedSession = await prisma.session.delete({
        where: {
            id: parseInt(id)
        },
        include: {
            trainee: {
                select:{
                    fname: true,
                    mname: true,
                    lname: true
                },
            },
            coach: {
                select:{
                    fname: true,
                    mname: true,
                    lname: true
                },
            }
        },
    })
    await RemoveCache('sessions', deletedSession)
    return deletedSession
}

export const deletePayment = async (id) => {
    const deletedPayment = await prisma.payment.delete({
        where: {
            id: parseInt(id)
        },
    })
    await RemoveCache('payments', deletedPayment)
    return deletedPayment
}

export const deleteProgram = async (id) => {
    const deletedProgram = await prisma.program.delete({
        where: {
            id: parseInt(id)
        },
    })

    await RemoveCache('programs', deletedProgram)
    return deletedProgram
} 


// Editing Data
export const editTrainee = async (data) => {   
    const updateTrainee = await prisma.trainee.update({
        where: {
            id: parseInt(data.id),
        },
        data: data,
        include: {
            sessions: {
                select:{
                    duration: true,
                    createdAt: true,
                    private: true,
                },
                orderBy: {id: 'desc'}
            },
            payments: {
                select:{
                    amount: true,
                    createdAt: true
                }
            },
            program: true,
            private: true,
            special: true,
            coach: true
        },

        })
    await UpdateCache('trainees', updateTrainee)
    return updateTrainee
}

export const editCoach = async (data) => {
    return await RedisCache(`coach:${data.id}`, async () => {
        const updateCoach = await prisma.coach.update({
            where: {
                id: parseInt(data.id),
            },
            data: data,
            include: {
                _count: {
                    select:{ 
                        trainees: true, 
                        sessions: true,
                    },
                },
            },
          })
        await UpdateCache('coaches', updateCoach)
        return updateCoach
    }, 2)
}

export const editProgram = async (data) => {
    const updateProgram = await prisma.program.update({
        where: {
            id: parseInt(data.id),
        },
        data: data,
        orderBy: {id: 'asc'},
        include: {
            _count: {
                select:{ 
                    trainees: true,
                    private_trainees: true,
                    special_trainees: true
                },
            },            
        },
      })
    
    await UpdateCache('programs', updateProgram)
    return updateProgram
}

export const editSettings = async (data) => {
    const updateSettings = await prisma.settings.update({
        where: {id: 1},
        data: data,
        include: {
            testimonials: true,
        }
      })
    
    await UpdateCache('settings', updateSettings)
    return updateSettings
}

// Retrieving Data
export const getTrainee = async (data) => {
    const trainee = await prisma.trainee.findUnique({
        where: data,
      })
      return trainee
}

export const getCoach = async (data) => {
    return await RedisCache(`coach:${data.id}`, async () => {
        const coach = await prisma.coach.findUnique({
            where: data,
        })
        return coach
    })
}

export const countTrainees = async () => {
    return await RedisCache(`trainess:count`, async () => {
        const count = await prisma.trainee.count()
        return count
    })
}

export const latestPayments = async () => {
    return await RedisCache('payments:latest', async () => {
        const month_from_today = new Date(new Date() - 2592000000)

        const payments = await prisma.payment.aggregate({
            _sum: {
              amount: true,
            },
            where: {
              createdAt: {
                gte: month_from_today
              },
            },
        })
          
        return payments
    }, 2)
}

export const latestSessions = async () => {
    return await RedisCache('sessions:latest', async () => {
        const month_from_today = new Date(new Date() - 2592000000)

        const sessions = await prisma.session.aggregate({
            _count: true,
            where: {
              createdAt: {
                gte: month_from_today
              },
            },
        })
          
        return sessions
    })
}

export const unreadMessages = async () => {
    return await RedisCache ('messages:unread', async () => {
        const messages = await prisma.message.aggregate({
            _count: true,
            where: {
              read: false,
            },
        })
          
        return messages
    }, 2)
}

export const seeMessage = async (id) => {
    const seenMessage = await prisma.message.update({
        where: {
            id: parseInt(id),
        },
        data: {
            read: true
        },
    })
    let old_count = await kv.get('messages:unread')
    await kv.set('messages:unread', old_count? parseInt(old_count) -1 : 0, {ex:6*3600}) 
    return seenMessage
}