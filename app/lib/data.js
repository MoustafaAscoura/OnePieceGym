import prisma from './prisma'

const fetchTrainees = async (query="", results=10, page=1) => {
    try {
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
    } catch (error) {
        console.log(error)
        return error
    }
}

export {fetchTrainees}