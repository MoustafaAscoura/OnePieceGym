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
    let period = program?.period
    let duration = program?.duration || 0
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

const calculate_private_sessions = (program, start, sessions) => {
    if (program.name.toLowerCase() == "no program")
    {
        return 0
    } else {
        let private_start = new Date(start)
        return program.duration - sessions.filter(session => {
            const session_date = new Date(session.createdAt)
            return session.private && session_date > private_start
        }).length
    }

}

const chech_status = (trainee) => {
    const dates = []
    if (trainee.programID && trainee.program.name.toLowerCase() !== "no program"){
        dates.push(trainee.membership_expiry)
    }
    if (trainee.privateID && trainee.private.name.toLowerCase() !== "no program"){
        dates.push(trainee.private_start)
    }
    if (trainee.specialID && trainee.special.name.toLowerCase() !== "no program"){
        dates.push(trainee.special_start)
    }
    if (dates.length == 0) dates.push(new Date())

    const sorted_dates = dates.sort((a, b) => b - a);
    let end_date = sorted_dates[0]

    if (parseInt(trainee.payment_now) < parseInt(trainee.payment_total)) {
        return "Payment Due"
    } else if ((end_date < new Date()) && (!trainee.private_sessions)) {
        return "Membership Expired"
    } else {
        return "Valid Membership"
    }
}

const calculate_total_payment = (trainee) => {
    const dates = []
    if (trainee.programID && trainee.program.name.toLowerCase() !== "no program"){
        dates.push(trainee.basic_start)
    }
    if (trainee.privateID && trainee.private.name.toLowerCase() !== "no program"){
        dates.push(trainee.private_start)
    }
    if (trainee.specialID && trainee.special.name.toLowerCase() !== "no program"){
        dates.push(trainee.special_start)
    }
    if (dates.length == 0) dates.push(new Date())

    const dates_sorted = dates.sort((a, b) => a - b);

    const sub_payments = trainee.payments.filter(pay => {
        let pay_date = new Date(pay.createdAt)
        return pay_date >= dates_sorted[0]
    })

    return sub_payments.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
}

const serialize_trainee = (trainee) => {
    trainee.createdAt = new Date(trainee.createdAt)
    trainee.birthdate = new Date(trainee.birthdate)
    trainee.name = trainee.fname + (` ${trainee.mname} ` || ' ') + trainee.lname;
    trainee.age = trainee.birthdate ? calculate_age(trainee.birthdate): '';
    trainee.coach_name = trainee.coach? trainee.coach.fname + ' ' + trainee.coach.lname: '';
    trainee.membership_expiry = calculate_due_date(trainee.basic_start, trainee.program);
    trainee.special_membership_expiry = calculate_due_date(trainee.special_start, trainee.special);
    trainee.sessions_count = trainee.sessions.length + ` (${calculate_sessions_month(trainee.sessions)} this month)`
    trainee.private_sessions = calculate_private_sessions(trainee.private, trainee.private_start, trainee.sessions)
    trainee.payment_now = calculate_total_payment(trainee);
    trainee.payment_total = trainee.program?.cost + trainee.private?.cost + trainee.special?.cost
    trainee.payment_due = `${trainee.payment_now} / ${trainee.payment_total}`
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