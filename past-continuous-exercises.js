document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Past Continuous';

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = [];

    // --- EXERCÍCIOS AFIRMATIVOS, NEGATIVOS E INTERROGATIVOS (150 exemplos) ---
    exercises = [
        // --- EXERCÍCIOS AFIRMATIVOS (50) ---
        { id: 1, type: 'mc', question: "I ___ (watch) TV when the phone rang.", options: ["watched", "was watching", "were watching"], correctAnswer: "was watching", hint: "Use 'was' + verbo com '-ing' com 'I'." },
        { id: 2, type: 'mc', question: "She ___ (read) a book while he was cooking.", options: ["read", "was reading", "were reading"], correctAnswer: "was reading", hint: "'She' usa 'was' + verbo com '-ing'." },
        { id: 3, type: 'mc', question: "They ___ (play) football when it started to rain.", options: ["played", "was playing", "were playing"], correctAnswer: "were playing", hint: "'They' usa 'were' + verbo com '-ing'." },
        { id: 4, type: 'mc', question: "We ___ (study) at 8 PM last night.", options: ["studied", "were studying", "was studying"], correctAnswer: "were studying", hint: "'We' usa 'were' + verbo com '-ing'." },
        { id: 5, type: 'mc', question: "He ___ (run) in the park when he saw his friend.", options: ["ran", "was running", "was runing"], correctAnswer: "was running", hint: "Verbos terminados em consoante+vogal+consoante dobram a última letra antes do '-ing'." },
        { id: 6, type: 'mc', question: "I ___ (swim) in the pool while my brother was sunbathing.", options: ["was swimming", "was swiming", "swam"], correctAnswer: "was swimming", hint: "'Swim' dobra o 'm' antes de adicionar '-ing'." },
        { id: 7, type: 'mc', question: "You ___ (make) dinner when I arrived.", options: ["were making", "made", "were make"], correctAnswer: "were making", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 8, type: 'mc', question: "She ___ (sit) on the sofa while he was working.", options: ["was sitting", "was siting", "sat"], correctAnswer: "was sitting", hint: "'Sit' dobra o 't' antes de adicionar '-ing'." },
        { id: 9, type: 'mc', question: "They ___ (come) to visit us last week at this time.", options: ["were coming", "were comeing", "came"], correctAnswer: "were coming", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 10, type: 'mc', question: "He ___ (lie) on the beach when it began to rain.", options: ["was lying", "was lieing", "lay"], correctAnswer: "was lying", hint: "Verbos terminados em 'ie' mudam para 'y' antes do '-ing'." },
        { id: 11, type: 'mc', question: "We ___ (shop) at the mall when we met Sarah.", options: ["were shopping", "were shoping", "shopped"], correctAnswer: "were shopping", hint: "'Shop' dobra o 'p' antes de adicionar '-ing'." },
        { id: 12, type: 'mc', question: "I ___ (begin) my homework when the power went out.", options: ["was beginning", "was begining", "began"], correctAnswer: "was beginning", hint: "'Begin' dobra o 'n' antes de adicionar '-ing'." },
        { id: 13, type: 'mc', question: "She ___ (study) English while her sister was sleeping.", options: ["was studying", "studied", "was studing"], correctAnswer: "was studying", hint: "'Study' apenas adiciona '-ing', sem tirar letras." },
        { id: 14, type: 'mc', question: "It ___ (rain) heavily when we left home.", options: ["was raining", "rained", "were raining"], correctAnswer: "was raining", hint: "'It' usa 'was' + verbo com '-ing'." },
        { id: 15, type: 'mc', question: "The children ___ (play) in the garden when it got dark.", options: ["were playing", "was playing", "played"], correctAnswer: "were playing", hint: "'The children' é plural, use 'were'." },
        { id: 16, type: 'mc', question: "My brother ___ (work) on his project at midnight.", options: ["was working", "worked", "was work"], correctAnswer: "was working", hint: "Não esqueça o 'to be' (was) antes do verbo com '-ing'." },
        { id: 17, type: 'mc', question: "We ___ (eat) dinner when the doorbell rang.", options: ["were eating", "ate", "was eating"], correctAnswer: "were eating", hint: "'We' usa 'were' + verbo com '-ing'." },
        { id: 18, type: 'mc', question: "You ___ (drive) too fast when the police stopped you.", options: ["were driving", "drove", "were driveing"], correctAnswer: "were driving", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 19, type: 'mc', question: "He ___ (write) an email when his computer crashed.", options: ["was writing", "wrote", "was writeing"], correctAnswer: "was writing", hint: "Verbos terminados em 'e' perdem o 'e' antes do '-ing'." },
        { id: 20, type: 'mc', question: "They ___ (build) a house last year at this time.", options: ["were building", "built", "was building"], correctAnswer: "were building", hint: "'They' usa 'were' + verbo com '-ing'." },
        { id: 21, type: 'mc', question: "I ___ (learn) to drive while I was living in London.", options: ["was learning", "learned", "were learning"], correctAnswer: "was learning", hint: "Com 'I', use 'was' + verbo com '-ing'." },
        { id: 22, type: 'mc', question: "She ___ (wear) a red dress when I saw her.", options: ["was wearing", "wore", "was weareing"], correctAnswer: "was wearing", hint: "Não esqueça o 'to be' (was) antes do verbo com '-ing'." },
        { id: 23, type: 'mc', question: "We ___ (watch) a movie when the lights went out.", options: ["were watching", "watched", "was watching"], correctAnswer: "were watching", hint: "'We' usa 'were' + verbo com '-ing'." },
        { id: 24, type: 'mc', question: "While he was cooking, I ___ (clean) the house.", options: ["was cleaning", "cleaned", "were cleaning"], correctAnswer: "was cleaning", hint: "Duas ações simultâneas no passado usam Past Continuous nas duas partes." },
        { id: 25, type: 'mc', question: "While they were sleeping, someone ___ (break) into the house.", options: ["was breaking", "broke", "were breaking"], correctAnswer: "was breaking", hint: "'Someone' é singular, use 'was'." },
        { id: 26, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: I (watch) TV when the phone (ring).", correctAnswer: "I was watching TV when the phone rang.", hint: "Ação longa em Past Continuous ('was watching'); ação curta que interrompe em Simple Past ('rang')." },
        { id: 27, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: She (cook) dinner when the fire alarm (go off).", correctAnswer: "She was cooking dinner when the fire alarm went off.", hint: "'Was cooking' (ação longa) + 'went off' (ação curta que interrompe)." },
        { id: 28, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: They (walk) to school when it (start) to rain.", correctAnswer: "They were walking to school when it started to rain.", hint: "'Were walking' (ação longa) + 'started' (ação curta que interrompe)." },
        { id: 29, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: He (write) a letter when the lights (go) out.", correctAnswer: "He was writing a letter when the lights went out.", hint: "'Was writing' (ação longa) + 'went out' (ação curta)." },
        { id: 30, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: We (study) for the exam when the teacher (arrive).", correctAnswer: "We were studying for the exam when the teacher arrived.", hint: "'Were studying' (ação longa) + 'arrived' (ação curta)." },
        { id: 31, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: I (sit) in the classroom when the fire alarm (ring).", correctAnswer: "I was sitting in the classroom when the fire alarm rang.", hint: "'Sit' dobra o 't' antes do '-ing'." },
        { id: 32, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: You (make) a mistake when I (see) you.", correctAnswer: "You were making a mistake when I saw you.", hint: "'Make' perde o 'e' antes do '-ing'." },
        { id: 33, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: The dog (run) in the yard when it (see) a cat.", correctAnswer: "The dog was running in the yard when it saw a cat.", hint: "'Run' dobra o 'n' antes do '-ing'." },
        { id: 34, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: She (swim) in the lake when it (begin) to storm.", correctAnswer: "She was swimming in the lake when it began to storm.", hint: "'Swim' dobra o 'm' antes do '-ing'." },
        { id: 35, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: They (come) to visit us when the accident (happen).", correctAnswer: "They were coming to visit us when the accident happened.", hint: "'Come' perde o 'e' antes do '-ing'." },
        { id: 36, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: He (lie) on the grass when it (start) to rain.", correctAnswer: "He was lying on the grass when it started to rain.", hint: "'Lie' muda para 'lying' antes do '-ing'." },
        { id: 37, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: We (shop) for groceries when we (meet) an old friend.", correctAnswer: "We were shopping for groceries when we met an old friend.", hint: "'Shop' dobra o 'p' antes do '-ing'." },
        { id: 38, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: I (begin) my presentation when the projector (stop) working.", correctAnswer: "I was beginning my presentation when the projector stopped working.", hint: "'Begin' dobra o 'n' antes do '-ing'." },
        { id: 39, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: She (study) for her test when her phone (ring).", correctAnswer: "She was studying for her test when her phone rang.", hint: "'Study' apenas adiciona '-ing'." },
        { id: 40, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: It (rain) outside when we (leave) the house.", correctAnswer: "It was raining outside when we left the house.", hint: "'It' usa 'was' + verbo com '-ing'." },
        { id: 41, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: The children (play) in the park when it (get) dark.", correctAnswer: "The children were playing in the park when it got dark.", hint: "'The children' é plural, use 'were'." },
        { id: 42, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: My sister (work) on a project when the computer (crash).", correctAnswer: "My sister was working on a project when the computer crashed.", hint: "Não esqueça o 'to be' (was)." },
        { id: 43, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: We (eat) breakfast when the mail carrier (arrive).", correctAnswer: "We were eating breakfast when the mail carrier arrived.", hint: "'We' usa 'were' + verbo com '-ing'." },
        { id: 44, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: You (drive) very fast when the police (stop) you.", correctAnswer: "You were driving very fast when the police stopped you.", hint: "'Drive' perde o 'e' antes do '-ing'." },
        { id: 45, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: He (write) a report when his boss (call).", correctAnswer: "He was writing a report when his boss called.", hint: "'Write' perde o 'e' antes do '-ing'." },
        { id: 46, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: They (build) a new bridge when the funding (run) out.", correctAnswer: "They were building a new bridge when the funding ran out.", hint: "'They' usa 'were' + verbo com '-ing'." },
        { id: 47, type: 'rewrite', question: "Rewrite using Past Continuous (both actions happening at the same time): While I (read) a book, my brother (watch) TV.", correctAnswer: "While I was reading a book, my brother was watching TV.", hint: "Duas ações longas acontecendo ao mesmo tempo usam Past Continuous nas duas partes." },
        { id: 48, type: 'rewrite', question: "Rewrite using Past Continuous (both actions happening at the same time): While she (cook) dinner, he (set) the table.", correctAnswer: "While she was cooking dinner, he was setting the table.", hint: "'Set' dobra o 't' antes do '-ing'." },
        { id: 49, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: While they (study), it (start) to rain.", correctAnswer: "While they were studying, it started to rain.", hint: "'While' + ação longa (Past Continuous), seguida de ação curta (Simple Past)." },
        { id: 50, type: 'rewrite', question: "Rewrite using Past Continuous and Simple Past: While we (walk) home, we (see) an accident.", correctAnswer: "While we were walking home, we saw an accident.", hint: "'While' + ação longa (Past Continuous), seguida de ação curta (Simple Past)." },

        // --- EXERCÍCIOS NEGATIVOS (50) ---
        { id: 51, type: 'mc', question: "I ___ (not/watch) TV when he arrived.", options: ["wasn't watching", "weren't watching", "didn't watching"], correctAnswer: "wasn't watching", hint: "Com 'I', use 'wasn't' + verbo com '-ing'." },
        { id: 52, type: 'mc', question: "She ___ (not/sleep) when I called.", options: ["wasn't sleeping", "weren't sleeping", "didn't sleeping"], correctAnswer: "wasn't sleeping", hint: "'She' usa 'wasn't' + verbo com '-ing'." },
        { id: 53, type: 'mc', question: "They ___ (not/study) at that time.", options: ["wasn't studying", "weren't studying", "didn't studying"], correctAnswer: "weren't studying", hint: "'They' usa 'weren't' + verbo com '-ing'." },
        { id: 54, type: 'mc', question: "We ___ (not/play) football when it started to rain.", options: ["weren't playing", "wasn't playing", "didn't play"], correctAnswer: "weren't playing", hint: "'We' usa 'weren't' + verbo com '-ing'." },
        { id: 55, type: 'mc', question: "He ___ (not/run) in the park when I saw him.", options: ["wasn't running", "weren't running", "didn't running"], correctAnswer: "wasn't running", hint: "'He' usa 'wasn't' + verbo com '-ing'." },
        { id: 56, type: 'mc', question: "I ___ (not/swim) in the pool at that time.", options: ["wasn't swimming", "weren't swimming", "didn't swimming"], correctAnswer: "wasn't swimming", hint: "Com 'I', use 'wasn't' + verbo com '-ing'." },
        { id: 57, type: 'mc', question: "You ___ (not/listen) to me when I was talking.", options: ["weren't listening", "wasn't listening", "didn't listening"], correctAnswer: "weren't listening", hint: "'You' usa 'weren't' + verbo com '-ing'." },
        { id: 58, type: 'mc', question: "She ___ (not/cook) dinner when the phone rang.", options: ["wasn't cooking", "weren't cooking", "didn't cooking"], correctAnswer: "wasn't cooking", hint: "'She' usa 'wasn't' + verbo com '-ing'." },
        { id: 59, type: 'mc', question: "They ___ (not/come) to the party last night at 9 PM.", options: ["weren't coming", "wasn't coming", "didn't coming"], correctAnswer: "weren't coming", hint: "'They' usa 'weren't' + verbo com '-ing'." },
        { id: 60, type: 'mc', question: "It ___ (not/rain) when we left.", options: ["wasn't raining", "weren't raining", "didn't raining"], correctAnswer: "wasn't raining", hint: "'It' usa 'wasn't' + verbo com '-ing'." },
        { id: 61, type: 'mc', question: "We ___ (not/eat) when you arrived.", options: ["weren't eating", "wasn't eating", "didn't eating"], correctAnswer: "weren't eating", hint: "'We' usa 'weren't' + verbo com '-ing'." },
        { id: 62, type: 'mc', question: "The children ___ (not/play) outside when it got dark.", options: ["weren't playing", "wasn't playing", "didn't play"], correctAnswer: "weren't playing", hint: "'The children' é plural, use 'weren't'." },
        { id: 63, type: 'mc', question: "My brother ___ (not/work) at midnight.", options: ["wasn't working", "weren't working", "didn't working"], correctAnswer: "wasn't working", hint: "'My brother' é 3ª pessoa do singular, use 'wasn't'." },
        { id: 64, type: 'mc', question: "I ___ (not/drive) fast when the police stopped me.", options: ["wasn't driving", "weren't driving", "didn't driving"], correctAnswer: "wasn't driving", hint: "Com 'I', use 'wasn't' + verbo com '-ing'." },
        { id: 65, type: 'mc', question: "He ___ (not/write) an email when his computer crashed.", options: ["wasn't writing", "weren't writing", "didn't writing"], correctAnswer: "wasn't writing", hint: "'He' usa 'wasn't' + verbo com '-ing'." },
        { id: 66, type: 'mc', question: "They ___ (not/build) anything last year at this time.", options: ["weren't building", "wasn't building", "didn't build"], correctAnswer: "weren't building", hint: "'They' usa 'weren't' + verbo com '-ing'." },
        { id: 67, type: 'mc', question: "She ___ (not/wear) a jacket when I saw her.", options: ["wasn't wearing", "weren't wearing", "didn't wearing"], correctAnswer: "wasn't wearing", hint: "'She' usa 'wasn't' + verbo com '-ing'." },
        { id: 68, type: 'mc', question: "We ___ (not/watch) TV when the power went out.", options: ["weren't watching", "wasn't watching", "didn't watching"], correctAnswer: "weren't watching", hint: "'We' usa 'weren't' + verbo com '-ing'." },
        { id: 69, type: 'mc', question: "You ___ (not/make) a mistake when I checked your work.", options: ["weren't making", "wasn't making", "didn't making"], correctAnswer: "weren't making", hint: "'You' usa 'weren't' + verbo com '-ing'." },
        { id: 70, type: 'mc', question: "He usually studies at night, but last night he ___ (not/study).", options: ["wasn't studying", "weren't studying", "didn't studying"], correctAnswer: "wasn't studying", hint: "'He' usa 'wasn't' + verbo com '-ing'." },
        { id: 71, type: 'mc', question: "I ___ (not/sit) in the classroom when the bell rang.", options: ["wasn't sitting", "weren't sitting", "didn't sitting"], correctAnswer: "wasn't sitting", hint: "Com 'I', use 'wasn't' + verbo com '-ing'." },
        { id: 72, type: 'mc', question: "The dog ___ (not/run) in the yard when it started to rain.", options: ["wasn't running", "weren't running", "didn't running"], correctAnswer: "wasn't running", hint: "'The dog' é 3ª pessoa do singular, use 'wasn't'." },
        { id: 73, type: 'mc', question: "We ___ (not/shop) when we met Sarah.", options: ["weren't shopping", "wasn't shopping", "didn't shopping"], correctAnswer: "weren't shopping", hint: "'We' usa 'weren't' + verbo com '-ing'." },
        { id: 74, type: 'mc', question: "She ___ (not/sit) on the sofa when I called her.", options: ["wasn't sitting", "weren't sitting", "didn't sitting"], correctAnswer: "wasn't sitting", hint: "'She' usa 'wasn't' + verbo com '-ing'." },
        { id: 75, type: 'mc', question: "They ___ (not/lie) on the beach when it began to rain.", options: ["weren't lying", "wasn't lying", "didn't lying"], correctAnswer: "weren't lying", hint: "'They' usa 'weren't' + verbo com '-ing'." },
        { id: 76, type: 'rewrite', question: "Rewrite the sentence in the negative form: I was watching TV when the phone rang.", correctAnswer: "I wasn't watching TV when the phone rang.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 77, type: 'rewrite', question: "Rewrite the sentence in the negative form: She was cooking dinner when the fire alarm went off.", correctAnswer: "She wasn't cooking dinner when the fire alarm went off.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 78, type: 'rewrite', question: "Rewrite the sentence in the negative form: They were walking to school when it started to rain.", correctAnswer: "They weren't walking to school when it started to rain.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 79, type: 'rewrite', question: "Rewrite the sentence in the negative form: He was writing a letter when the lights went out.", correctAnswer: "He wasn't writing a letter when the lights went out.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 80, type: 'rewrite', question: "Rewrite the sentence in the negative form: We were studying for the exam when the teacher arrived.", correctAnswer: "We weren't studying for the exam when the teacher arrived.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 81, type: 'rewrite', question: "Rewrite the sentence in the negative form: I was sitting in the classroom when the fire alarm rang.", correctAnswer: "I wasn't sitting in the classroom when the fire alarm rang.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 82, type: 'rewrite', question: "Rewrite the sentence in the negative form: You were making a mistake when I saw you.", correctAnswer: "You weren't making a mistake when I saw you.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 83, type: 'rewrite', question: "Rewrite the sentence in the negative form: The dog was running in the yard when it saw a cat.", correctAnswer: "The dog wasn't running in the yard when it saw a cat.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 84, type: 'rewrite', question: "Rewrite the sentence in the negative form: She was swimming in the lake when it began to storm.", correctAnswer: "She wasn't swimming in the lake when it began to storm.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 85, type: 'rewrite', question: "Rewrite the sentence in the negative form: They were coming to visit us when the accident happened.", correctAnswer: "They weren't coming to visit us when the accident happened.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 86, type: 'rewrite', question: "Rewrite the sentence in the negative form: He was lying on the grass when it started to rain.", correctAnswer: "He wasn't lying on the grass when it started to rain.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 87, type: 'rewrite', question: "Rewrite the sentence in the negative form: We were shopping for groceries when we met an old friend.", correctAnswer: "We weren't shopping for groceries when we met an old friend.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 88, type: 'rewrite', question: "Rewrite the sentence in the negative form: I was beginning my presentation when the projector stopped working.", correctAnswer: "I wasn't beginning my presentation when the projector stopped working.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 89, type: 'rewrite', question: "Rewrite the sentence in the negative form: She was studying for her test when her phone rang.", correctAnswer: "She wasn't studying for her test when her phone rang.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 90, type: 'rewrite', question: "Rewrite the sentence in the negative form: It was raining outside when we left the house.", correctAnswer: "It wasn't raining outside when we left the house.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 91, type: 'rewrite', question: "Rewrite the sentence in the negative form: The children were playing in the park when it got dark.", correctAnswer: "The children weren't playing in the park when it got dark.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 92, type: 'rewrite', question: "Rewrite the sentence in the negative form: My sister was working on a project when the computer crashed.", correctAnswer: "My sister wasn't working on a project when the computer crashed.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 93, type: 'rewrite', question: "Rewrite the sentence in the negative form: We were eating breakfast when the mail carrier arrived.", correctAnswer: "We weren't eating breakfast when the mail carrier arrived.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 94, type: 'rewrite', question: "Rewrite the sentence in the negative form: You were driving very fast when the police stopped you.", correctAnswer: "You weren't driving very fast when the police stopped you.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 95, type: 'rewrite', question: "Rewrite the sentence in the negative form: He was writing a report when his boss called.", correctAnswer: "He wasn't writing a report when his boss called.", hint: "Use 'wasn't' no lugar de 'was'." },
        { id: 96, type: 'rewrite', question: "Rewrite the sentence in the negative form: They were building a new bridge when the funding ran out.", correctAnswer: "They weren't building a new bridge when the funding ran out.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 97, type: 'rewrite', question: "Rewrite the sentence in the negative form: While she was cooking dinner, he was setting the table.", correctAnswer: "While she wasn't cooking dinner, he wasn't setting the table.", hint: "Use 'wasn't' nas duas partes da frase." },
        { id: 98, type: 'rewrite', question: "Rewrite the sentence in the negative form: While they were studying, it started to rain.", correctAnswer: "While they weren't studying, it started to rain.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 99, type: 'rewrite', question: "Rewrite the sentence in the negative form: While we were walking home, we saw an accident.", correctAnswer: "While we weren't walking home, we saw an accident.", hint: "Use 'weren't' no lugar de 'were'." },
        { id: 100, type: 'rewrite', question: "Rewrite the sentence in the negative form: I was working at 8 PM yesterday.", correctAnswer: "I wasn't working at 8 PM yesterday.", hint: "Use 'wasn't' no lugar de 'was'." },

        // --- EXERCÍCIOS INTERROGATIVOS (50) ---
        { id: 101, type: 'mc', question: "___ you watching TV when he arrived?", options: ["Did", "Were", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'you' nas perguntas." },
        { id: 102, type: 'mc', question: "___ she sleeping when you called?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "Use 'Was' para 'she' nas perguntas." },
        { id: 103, type: 'mc', question: "___ they studying at that time?", options: ["Did", "Were", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'they' nas perguntas." },
        { id: 104, type: 'mc', question: "___ we playing football when it started to rain?", options: ["Were", "Did", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'we' nas perguntas." },
        { id: 105, type: 'mc', question: "___ he running in the park when you saw him?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "Use 'Was' para 'he' nas perguntas." },
        { id: 106, type: 'mc', question: "___ I sleeping when you arrived?", options: ["Was", "Were", "Did"], correctAnswer: "Was", hint: "Com 'I', use 'Was' nas perguntas." },
        { id: 107, type: 'mc', question: "___ you listening when I was talking?", options: ["Did", "Were", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'you' nas perguntas." },
        { id: 108, type: 'mc', question: "___ she cooking dinner when the phone rang?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "Use 'Was' para 'she' nas perguntas." },
        { id: 109, type: 'mc', question: "___ they coming to the party at 9 PM?", options: ["Did", "Were", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'they' nas perguntas." },
        { id: 110, type: 'mc', question: "___ it raining when you left?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "Use 'Was' para 'it' nas perguntas." },
        { id: 111, type: 'mc', question: "___ we eating when you arrived?", options: ["Were", "Did", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'we' nas perguntas." },
        { id: 112, type: 'mc', question: "___ the children playing outside when it got dark?", options: ["Was", "Were", "Did"], correctAnswer: "Were", hint: "'The children' é plural, use 'Were'." },
        { id: 113, type: 'mc', question: "___ your brother working at midnight?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "'Your brother' é 3ª pessoa do singular, use 'Was'." },
        { id: 114, type: 'mc', question: "___ I driving too fast?", options: ["Was", "Were", "Did"], correctAnswer: "Was", hint: "Com 'I', use 'Was' nas perguntas." },
        { id: 115, type: 'mc', question: "___ he writing an email when his computer crashed?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "Use 'Was' para 'he' nas perguntas." },
        { id: 116, type: 'mc', question: "___ they building anything last year at this time?", options: ["Did", "Were", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'they' nas perguntas." },
        { id: 117, type: 'mc', question: "___ she wearing a jacket when you saw her?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "Use 'Was' para 'she' nas perguntas." },
        { id: 118, type: 'mc', question: "___ we watching TV when the power went out?", options: ["Were", "Did", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'we' nas perguntas." },
        { id: 119, type: 'mc', question: "___ you making a mistake when I checked your work?", options: ["Did", "Were", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'you' nas perguntas." },
        { id: 120, type: 'mc', question: "He usually studies at night. ___ he studying last night?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "Use 'Was' para 'he' nas perguntas." },
        { id: 121, type: 'mc', question: "___ I sitting near you during the meeting?", options: ["Was", "Were", "Did"], correctAnswer: "Was", hint: "Com 'I', use 'Was' nas perguntas." },
        { id: 122, type: 'mc', question: "___ the dog running in the yard when it started to rain?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "'The dog' é 3ª pessoa do singular, use 'Was'." },
        { id: 123, type: 'mc', question: "___ we shopping when we met Sarah?", options: ["Were", "Did", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'we' nas perguntas." },
        { id: 124, type: 'mc', question: "___ she sitting on the sofa when you called her?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "Use 'Was' para 'she' nas perguntas." },
        { id: 125, type: 'mc', question: "___ they lying on the beach when it began to rain?", options: ["Did", "Were", "Was"], correctAnswer: "Were", hint: "Use 'Were' para 'they' nas perguntas." },
        { id: 126, type: 'mc', question: "What ___ you doing at 10 PM last night?", options: ["did", "was", "were"], correctAnswer: "were", hint: "Perguntas com 'What' seguem a mesma regra: 'were' para 'you'." },
        { id: 127, type: 'mc', question: "Where ___ she going when you saw her?", options: ["did", "was", "were"], correctAnswer: "was", hint: "'She' usa 'was' nas perguntas." },
        { id: 128, type: 'mc', question: "Why ___ they running when the police arrived?", options: ["did", "was", "were"], correctAnswer: "were", hint: "'They' usa 'were' nas perguntas." },
        { id: 129, type: 'mc', question: "What ___ happening when you walked in?", options: ["did", "was", "were"], correctAnswer: "was", hint: "'What' (singular, referindo-se a uma situação) usa 'was'." },
        { id: 130, type: 'mc', question: "___ it snowing when you left home this morning?", options: ["Did", "Was", "Were"], correctAnswer: "Was", hint: "'It' usa 'Was' nas perguntas." },
        { id: 131, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: I was watching TV when the phone rang.", correctAnswer: "Was I watching TV when the phone rang?", hint: "Coloque 'Was' antes de 'I'." },
        { id: 132, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: She was cooking dinner when the fire alarm went off.", correctAnswer: "Was she cooking dinner when the fire alarm went off?", hint: "Coloque 'Was' antes de 'she'." },
        { id: 133, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: They were walking to school when it started to rain.", correctAnswer: "Were they walking to school when it started to rain?", hint: "Coloque 'Were' antes de 'they'." },
        { id: 134, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: He was writing a letter when the lights went out.", correctAnswer: "Was he writing a letter when the lights went out?", hint: "Coloque 'Was' antes de 'he'." },
        { id: 135, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: We were studying for the exam when the teacher arrived.", correctAnswer: "Were we studying for the exam when the teacher arrived?", hint: "Coloque 'Were' antes de 'we'." },
        { id: 136, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: You were making a mistake when I saw you.", correctAnswer: "Were you making a mistake when I saw you?", hint: "Coloque 'Were' antes de 'you'." },
        { id: 137, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: The dog was running in the yard when it saw a cat.", correctAnswer: "Was the dog running in the yard when it saw a cat?", hint: "Coloque 'Was' antes de 'the dog'." },
        { id: 138, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: She was swimming in the lake when it began to storm.", correctAnswer: "Was she swimming in the lake when it began to storm?", hint: "Coloque 'Was' antes de 'she'." },
        { id: 139, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: They were coming to visit us when the accident happened.", correctAnswer: "Were they coming to visit us when the accident happened?", hint: "Coloque 'Were' antes de 'they'." },
        { id: 140, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: He was lying on the grass when it started to rain.", correctAnswer: "Was he lying on the grass when it started to rain?", hint: "Coloque 'Was' antes de 'he'." },
        { id: 141, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: We were shopping for groceries when we met an old friend.", correctAnswer: "Were we shopping for groceries when we met an old friend?", hint: "Coloque 'Were' antes de 'we'." },
        { id: 142, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: It was raining outside when we left the house.", correctAnswer: "Was it raining outside when we left the house?", hint: "Coloque 'Was' antes de 'it'." },
        { id: 143, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: The children were playing in the park when it got dark.", correctAnswer: "Were the children playing in the park when it got dark?", hint: "Coloque 'Were' antes de 'the children'." },
        { id: 144, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: My sister was working on a project when the computer crashed.", correctAnswer: "Was my sister working on a project when the computer crashed?", hint: "Coloque 'Was' antes de 'my sister'." },
        { id: 145, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: You were driving very fast when the police stopped you.", correctAnswer: "Were you driving very fast when the police stopped you?", hint: "Coloque 'Were' antes de 'you'." },
        { id: 146, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: He was writing a report when his boss called.", correctAnswer: "Was he writing a report when his boss called?", hint: "Coloque 'Was' antes de 'he'." },
        { id: 147, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: They were building a new bridge when the funding ran out.", correctAnswer: "Were they building a new bridge when the funding ran out?", hint: "Coloque 'Were' antes de 'they'." },
        { id: 148, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: While she was cooking dinner, he was setting the table.", correctAnswer: "While she was cooking dinner, was he setting the table?", hint: "Apenas a segunda parte da frase vira pergunta." },
        { id: 149, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: While they were studying, it started to rain.", correctAnswer: "While they were studying, did it start to rain?", hint: "A ação curta ('started') está no Simple Past, então a pergunta usa 'did'." },
        { id: 150, type: 'rewrite', question: "Rewrite the sentence in the interrogative form: While we were walking home, we saw an accident.", correctAnswer: "While we were walking home, did we see an accident?", hint: "A ação curta ('saw') está no Simple Past, então a pergunta usa 'did'." }
    ];

    // --- FUNÇÃO DE REGISTRO DE DESEMPENHO ---
    function updateStudentProgress(isCorrect) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === loggedInUser.id);

        if (userIndex !== -1) {
            if (!users[userIndex].progress) {
                users[userIndex].progress = {};
            }
            if (!users[userIndex].progress[TOPIC_NAME]) {
                users[userIndex].progress[TOPIC_NAME] = { correct: 0, incorrect: 0 };
            }

            if (isCorrect) {
                users[userIndex].progress[TOPIC_NAME].correct++;
            } else {
                users[userIndex].progress[TOPIC_NAME].incorrect++;
            }

            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // --- FUNÇÕES DE EXIBIÇÃO E LÓGICA ---

    function renderExercise() {
        const exercise = exercises[currentExerciseIndex];
        exerciseArea.innerHTML = '';

        const questionElement = document.createElement('p');
        questionElement.classList.add('exercise-question');
        questionElement.textContent = exercise.question;
        exerciseArea.appendChild(questionElement);

        if (exercise.type === 'mc') {
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options-container');

            const shuffledOptions = [...exercise.options].sort(() => Math.random() - 0.5);

            shuffledOptions.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-button');
                button.textContent = option;
                button.addEventListener('click', () => checkAnswer(option, exercise.correctAnswer, button));
                optionsContainer.appendChild(button);
            });
            exerciseArea.appendChild(optionsContainer);
        } else if (exercise.type === 'rewrite') {
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('rewrite-input');
            input.placeholder = 'Digite sua resposta aqui...';
            exerciseArea.appendChild(input);

            const checkBtn = document.createElement('button');
            checkBtn.classList.add('check-button');
            checkBtn.textContent = 'Verificar';
            checkBtn.addEventListener('click', () => checkAnswer(input.value, exercise.correctAnswer, input));
            exerciseArea.appendChild(checkBtn);
        }

        updateNavigationButtons();
    }

    function checkAnswer(userAnswer, correctAnswer, element) {
        const feedbackMessage = document.createElement('p');
        feedbackMessage.classList.add('feedback-message');

        const normalizedUserAnswer = userAnswer.trim().toLowerCase();
        const normalizedCorrectAnswer = correctAnswer.trim().toLowerCase();
        const isCorrect = normalizedUserAnswer === normalizedCorrectAnswer;

        if (isCorrect) {
            feedbackMessage.textContent = 'Correto! 🎉';
            feedbackMessage.classList.add('correct');
            if (element.classList.contains('option-button')) {
                element.classList.add('correct');
            }
        } else {
            feedbackMessage.textContent = `Incorreto. A resposta correta é: "${correctAnswer}".`;
            feedbackMessage.classList.add('incorrect');
            if (element.classList.contains('option-button')) {
                element.classList.add('incorrect');
                const options = exerciseArea.querySelectorAll('.option-button');
                options.forEach(opt => {
                    if (opt.textContent.trim().toLowerCase() === normalizedCorrectAnswer) {
                        opt.classList.add('correct');
                    }
                });
            }
        }
        exerciseArea.appendChild(feedbackMessage);

        updateStudentProgress(isCorrect);

        const currentExercise = exercises[currentExerciseIndex];
        if (currentExercise.type === 'mc') {
            exerciseArea.querySelectorAll('.option-button').forEach(btn => btn.disabled = true);
        } else if (currentExercise.type === 'rewrite') {
            exerciseArea.querySelector('.rewrite-input').disabled = true;
            exerciseArea.querySelector('.check-button').disabled = true;
        }
    }

    function updateNavigationButtons() {
        prevButton.style.display = currentExerciseIndex > 0 ? 'inline-block' : 'none';
        nextButton.style.display = currentExerciseIndex < exercises.length - 1 ? 'inline-block' : 'none';
    }

    prevButton.addEventListener('click', () => {
        if (currentExerciseIndex > 0) {
            currentExerciseIndex--;
            renderExercise();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentExerciseIndex < exercises.length - 1) {
            currentExerciseIndex++;
            renderExercise();
        }
    });

    renderExercise();
});
