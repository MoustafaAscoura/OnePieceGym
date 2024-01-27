const calculate_age = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const calculate_due_date = (start, program) => {
    let period = program.period
    let duration = program.duration
    let end_date = new Date(start)

    switch (period) {
        case ('year'):
            end_date.setFullYear(end_date.getFullYear() + duration)
            break;
        case ('month'):
            end_date.setMonth(end_date.getMonth() + duration)
            break;
        case ('week'):
            end_date.setDate(end_date.getDate() + duration*7)
            break;
        case ('day'):
            end_date.setDate(end_date.getDate() + duration)
            break;
    }


    return end_date.toLocaleDateString('en-GB')
}

const calculate_sessions_month = (sessions) => {
    let today = new Date()
    let curr_month = today.getMonth()
    return sessions.filter(session => {
        let session_date = new Date(session.createdAt)
        return session_date.getMonth() == curr_month
    }).length
}

const chech_status = (trainee) => {
    let end_date = new Date(trainee.membership_expiry)

    return parseInt(trainee.payment_total) < parseInt(trainee.program.cost)? "Payment Due"
    :end_date < new Date()? "Membership Expired"
    :"Valid Membership"
}

const calculate_due_payment = (payments, start) => {
    const sub_start = new Date(start)
    const sub_payments = payments.filter(pay => {
        let pay_date = new Date(pay.createdAt)
        return pay_date >= sub_start
    })
    return sub_payments.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
}

const serialize_trainee = (trainee) => {
    trainee.createdAt = new Date(trainee.createdAt)
    trainee.birthdate = new Date(trainee.birthdate)
    trainee.name = trainee.fname + (` ${trainee.mname} ` || ' ') + trainee.lname;
    trainee.age = trainee.birthdate ? calculate_age(trainee.birthdate): '';
    trainee.coach_name = trainee.coach? trainee.coach.fname + ' ' + trainee.coach.lname: '';
    trainee.membership_expiry = calculate_due_date(trainee.subscription_start, trainee.program);
    trainee.sessions_count = trainee.sessions.length + ` (${calculate_sessions_month(trainee.sessions)} this month)`
    trainee.payment_total = calculate_due_payment(trainee.payments, trainee.subscription_start);
    trainee.payment_due = `${trainee.payment_total} / ${trainee.program.cost}`
    trainee.status = chech_status(trainee);
    return trainee
}

const serialize_coach = (coach) => {
    coach.birthdate = new Date(coach.birthdate)
    coach.name = coach.fname + (` ${coach.mname} ` || ' ') + coach.lname;
    coach.age = coach.birthdate ? calculate_age(coach.birthdate): '';
    coach.sessions_count = coach._count.sessions
    coach.trainees_count = coach._count.trainees
    return coach
}

export {serialize_trainee, serialize_coach};