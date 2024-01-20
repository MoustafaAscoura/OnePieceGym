import prisma from './prisma'

const fetchTrainees = async () => {
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

const fetchCoaches = async () => {
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

const fetchPayments = async () => {
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

const fetchSessions = async () => {
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

const fetchMessages = async () => {
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

const seeMessage = async (id) => {   
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

const editTrainee = async (data) => {   
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

const editCoach = async (data) => {   
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

const createTrainee = async (data) => {
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

const createMessage = async (data) => {
    const newMessage = await prisma.message.create({
        data: data,
      })
    return newMessage
}

const createCoach = async (data) => {
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

const deleteTrainee = async (id) => {
    const deletedTrainee = await prisma.trainee.delete({
        where: {
            id: parseInt(id)
        },
    })

    return deletedTrainee
} 

const deleteCoach = async (id) => {
    const deletedCoach = await prisma.coach.delete({
        where: {
            id: parseInt(id)
        },
    })

    return deletedCoach
} 

const addPayment = async (data) => {
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

const addSession = async (data) => {
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

const getTrainee = async (id) => {
    const trainee = await prisma.trainee.findUnique({
        where: {
          id:parseInt(id),
        },
      })
    
      return trainee
}

const getCoach = async (id) => {
    const coach = await prisma.coach.findUnique({
        where: {
          id:parseInt(id),
        },
    })
    
    return coach
}


export {fetchTrainees, editTrainee, createTrainee, deleteTrainee, 
    addPayment, addSession, fetchPayments, fetchSessions, 
    fetchMessages, seeMessage, createMessage,
    fetchCoaches, editCoach, deleteCoach, createCoach,
    getCoach, getTrainee}