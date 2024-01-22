import prisma from './prisma'

export const fetchTrainees = async () => {
    const res = await prisma.trainee.findMany({
        orderBy: {id: 'asc'},
        include: {
            sessions: {
                select:{
                    duration: true,
                    createdAt: true
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
            coach: true
        },
    })
    return res;
}

export const fetchCoaches = async () => {
    const res = await prisma.coach.findMany({
        orderBy: {id: 'asc'},
        include: {
            sessions: {
                select:{
                    duration: true,
                    createdAt: true
                },
                orderBy: {id: 'desc'}
            },
            trainees: {
                select:{
                    fname: true,
                    lname: true,
                    subscription_start: true
                },
            },
        },
    })
    return res;
}

export const fetchPayments = async () => {
    try {
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
    } catch (error) {
        console.log(error)
        return error
    }
}

export const fetchSessions = async () => {
    try {
        const res = await prisma.session.findMany({
            orderBy: {id: 'desc'},
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
    } catch (error) {
        console.log(error)
        return error
    }
}

export const fetchMessages = async () => {
    try {
        const res = await prisma.message.findMany({
            orderBy: {id: 'desc'},
        })
        return res;
    } catch (error) {
        console.log(error)
        return error
    }
}

export const fetchPrograms = async () => {
    const res = await prisma.program.findMany({
        orderBy: {id: 'asc'},
        include: {
            _count: {
                select: {trainees: true}
            }
        },
    })
    return res;
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
    
    return seenMessage
}

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
                    createdAt: true
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
            coach: true
        },

      })

    return updateTrainee
}

export const editCoach = async (data) => {   
    const updateCoach = await prisma.coach.update({
        where: {
            id: parseInt(data.id),
        },
        data: data,
        include: {
            sessions: {
                select:{
                    duration: true,
                    createdAt: true
                },
                orderBy: {id: 'desc'}
            },
            trainees: {
                select:{
                    fname: true,
                    lname: true,
                    subscription_start: true
                },
            }
        },

      })

    return updateCoach
}

export const createTrainee = async (data) => {
    const newTrainee = await prisma.trainee.create({
        data: data,
        include: {
            sessions: {
                select:{
                    duration: true,
                    createdAt: true
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
            coach: true
        },
      })

    return newTrainee
}

export const createMessage = async (data) => {
    const newMessage = await prisma.message.create({
        data: data,
      })
    return newMessage
}

export const createCoach = async (data) => {
    const newCoach = await prisma.coach.create({
        data: data,
        include: {
            sessions: {
                select:{
                    duration: true,
                    createdAt: true
                },
                orderBy: {id: 'desc'}
            },
            trainees: {
                select:{
                    fname: true,
                    lname: true,
                    subscription_start: true
                },
            }
        },
      })

    return newCoach
}

export const deleteTrainee = async (id) => {
    const deletedTrainee = await prisma.trainee.delete({
        where: {
            id: parseInt(id)
        },
    })

    return deletedTrainee
} 

export const deleteCoach = async (id) => {
    const deletedCoach = await prisma.coach.delete({
        where: {
            id: parseInt(id)
        },
    })

    return deletedCoach
} 

export const addPayment = async (data) => {
    const newPayment = await prisma.payment.create({
        data: {
            amount: data.amount,
            createdAt: data.createdAt,
            traineeID: data.id || null
        },
      })
    
    if (data.renew) {
        const updateTrainee = await prisma.trainee.update({
            where: {
                id: parseInt(data.id),
            },
            data: {
                subscription_start: data.createdAt
            },
            include: {
                payments: {
                    select:{
                        amount: true,
                        createdAt: true
                    }
                },
                program: true,
            },

        })
        return updateTrainee

    }

    return newPayment
}

export const addSession = async (data) => {
    const newSession = await prisma.session.create({
        data: {
            description: data.description,
            createdAt: data.createdAt,
            traineeID: parseInt(data.id),
            coachID: parseInt(data.coachID),
            rating: data.rating? parseFloat(data.rating):5,
            duration: data.duration? parseFloat(data.duration):1,
        },
      })

    return newSession
}

export const addProgram = async (data) => {
    const newProgram = await prisma.program.create({
        data: data,
      })

    return newProgram
}

export const getTrainee = async (id) => {
    const trainee = await prisma.trainee.findUnique({
        where: {
          id:parseInt(id),
        },
      })
    
      return trainee
}

export const getCoach = async (id) => {
    const coach = await prisma.coach.findUnique({
        where: {
          id:parseInt(id),
        },
    })
    
    return coach
}

export const countTrainees = async () => {
    const count = await prisma.trainee.count()
    return count
}

export const countCoaches = async () => {
    const count = await prisma.coach.count()
    return count
}

export const countPrograms = async () => {
    const count = await prisma.program.count()
    return count
}

export const latestPayments = async () => {
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
}

export const latestSessions = async () => {
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
}

export const unreadMessages = async () => {
    const messages = await prisma.message.aggregate({
        _count: true,
        where: {
          read: false,
        },
    })
      
    return messages
}