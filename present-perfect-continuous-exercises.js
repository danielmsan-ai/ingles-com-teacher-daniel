document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Present Perfect Continuous';

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = [];

    // --- EXERCÍCIOS AFIRMATIVOS, NEGATIVOS E INTERROGATIVOS (180 exemplos) ---
    exercises = [
        // --- AFIRMATIVOS: ESTRUTURA BÁSICA (HAVE/HAS + BEEN + VERBO-ING) (20 mc) ---
        { id: 1, type: 'mc', question: "I ___ (study) English for three hours.", options: ["have studied", "have been studying", "has been studying"], correctAnswer: "have been studying", hint: "'I' usa 'have been' + verbo com '-ing'." },
        { id: 2, type: 'mc', question: "She ___ (work) here since 2020.", options: ["has worked", "has been working", "have been working"], correctAnswer: "has been working", hint: "'She' usa 'has been' + verbo com '-ing'." },
        { id: 3, type: 'mc', question: "They ___ (play) soccer all afternoon.", options: ["have played", "have been playing", "has been playing"], correctAnswer: "have been playing", hint: "'They' usa 'have been' + verbo com '-ing'." },
        { id: 4, type: 'mc', question: "We ___ (wait) for you for an hour.", options: ["have waited", "have been waiting", "has been waiting"], correctAnswer: "have been waiting", hint: "'We' usa 'have been' + verbo com '-ing'." },
        { id: 5, type: 'mc', question: "He ___ (read) that book all morning.", options: ["has read", "has been reading", "have been reading"], correctAnswer: "has been reading", hint: "'He' usa 'has been' + verbo com '-ing'." },
        { id: 6, type: 'mc', question: "You ___ (talk) on the phone for a long time.", options: ["have talked", "have been talking", "has been talking"], correctAnswer: "have been talking", hint: "'You' usa 'have been' + verbo com '-ing'." },
        { id: 7, type: 'mc', question: "It ___ (rain) since morning.", options: ["has rained", "has been raining", "have been raining"], correctAnswer: "has been raining", hint: "'It' usa 'has been' + verbo com '-ing'." },
        { id: 8, type: 'mc', question: "The children ___ (sleep) for ten hours.", options: ["have slept", "have been sleeping", "has been sleeping"], correctAnswer: "have been sleeping", hint: "'The children' (plural) usa 'have been' + verbo com '-ing'." },
        { id: 9, type: 'mc', question: "My brother ___ (travel) for six months.", options: ["has traveled", "has been traveling", "have been traveling"], correctAnswer: "has been traveling", hint: "'My brother' usa 'has been' + verbo com '-ing'." },
        { id: 10, type: 'mc', question: "I ___ (live) in this city since my birth.", options: ["have lived", "have been living", "has been living"], correctAnswer: "have been living", hint: "'I' usa 'have been' + verbo com '-ing'." },
        { id: 11, type: 'mc', question: "She ___ (cook) dinner for two hours.", options: ["has cooked", "has been cooking", "have been cooking"], correctAnswer: "has been cooking", hint: "'She' usa 'has been' + verbo com '-ing'." },
        { id: 12, type: 'mc', question: "They ___ (build) a new house for a year.", options: ["have built", "have been building", "has been building"], correctAnswer: "have been building", hint: "'They' usa 'have been' + verbo com '-ing'." },
        { id: 13, type: 'mc', question: "We ___ (learn) French for a year now.", options: ["have learned", "have been learning", "has been learning"], correctAnswer: "have been learning", hint: "'We' usa 'have been' + verbo com '-ing'." },
        { id: 14, type: 'mc', question: "He ___ (drive) since 5 AM.", options: ["has driven", "has been driving", "have been driving"], correctAnswer: "has been driving", hint: "'He' usa 'has been' + verbo com '-ing'." },
        { id: 15, type: 'mc', question: "You ___ (write) that report all day.", options: ["have written", "have been writing", "has been writing"], correctAnswer: "have been writing", hint: "'You' usa 'have been' + verbo com '-ing'." },
        { id: 16, type: 'mc', question: "The dog ___ (bark) for twenty minutes.", options: ["has barked", "has been barking", "have been barking"], correctAnswer: "has been barking", hint: "'The dog' (singular) usa 'has been' + verbo com '-ing'." },
        { id: 17, type: 'mc', question: "My parents ___ (garden) since early morning.", options: ["have gardened", "have been gardening", "has been gardening"], correctAnswer: "have been gardening", hint: "'My parents' (plural) usa 'have been' + verbo com '-ing'." },
        { id: 18, type: 'mc', question: "I ___ (try) to call you all day.", options: ["have tried", "have been trying", "has been trying"], correctAnswer: "have been trying", hint: "'I' usa 'have been' + verbo com '-ing'." },
        { id: 19, type: 'mc', question: "She ___ (teach) English for ten years.", options: ["has taught", "has been teaching", "have been teaching"], correctAnswer: "has been teaching", hint: "'She' usa 'has been' + verbo com '-ing'." },
        { id: 20, type: 'mc', question: "They ___ (argue) about it for an hour.", options: ["have argued", "have been arguing", "has been arguing"], correctAnswer: "have been arguing", hint: "'They' usa 'have been' + verbo com '-ing'." },

        // --- AFIRMATIVOS: PALAVRAS-CHAVE (FOR/SINCE/HOW LONG) (20 mc) ---
        { id: 21, type: 'mc', question: "I have been studying English ___ three hours.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 22, type: 'mc', question: "She has been working here ___ 2020.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 23, type: 'mc', question: "___ have you been waiting?", options: ["How long", "When", "What time"], correctAnswer: "How long", hint: "'How long' pergunta sobre duração." },
        { id: 24, type: 'mc', question: "We have been living here ___ a long time.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 25, type: 'mc', question: "He has been reading that book ___ morning.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 26, type: 'mc', question: "They have been playing soccer ___ 2 PM.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 27, type: 'mc', question: "It has been raining ___ all day.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração (todo o dia)." },
        { id: 28, type: 'mc', question: "The children have been sleeping ___ ten hours.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 29, type: 'mc', question: "My brother has been traveling ___ last summer.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 30, type: 'mc', question: "She has been cooking dinner ___ two hours.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 31, type: 'mc', question: "They have been building a new house ___ January.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 32, type: 'mc', question: "We have been learning French ___ a year.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 33, type: 'mc', question: "He has been driving ___ 5 AM.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 34, type: 'mc', question: "You have been writing that report ___ all day.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 35, type: 'mc', question: "The dog has been barking ___ twenty minutes.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 36, type: 'mc', question: "My parents have been gardening ___ early morning.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 37, type: 'mc', question: "I have been trying to call you ___ hours.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 38, type: 'mc', question: "She has been teaching English ___ 2016.", options: ["for", "since", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de início." },
        { id: 39, type: 'mc', question: "They have been arguing ___ an hour.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica duração." },
        { id: 40, type: 'mc', question: "___ have you been studying?", options: ["How long", "When", "What"], correctAnswer: "How long", hint: "'How long' pergunta sobre duração." },

        // --- AFIRMATIVOS: CONTRASTE COM PRESENT PERFECT SIMPLES (20 mc) ---
        { id: 41, type: 'mc', question: "I ___ (read) three books this month.", options: ["have read", "have been reading", "has read"], correctAnswer: "have read", hint: "Ênfase no resultado (três livros lidos), use Present Perfect Simples." },
        { id: 42, type: 'mc', question: "I ___ (read) for three hours.", options: ["have read", "have been reading", "has been reading"], correctAnswer: "have been reading", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 43, type: 'mc', question: "She ___ (write) five emails today.", options: ["has written", "has been writing", "have written"], correctAnswer: "has written", hint: "Ênfase no resultado (cinco emails escritos), use Present Perfect Simples." },
        { id: 44, type: 'mc', question: "She ___ (write) emails all morning.", options: ["has written", "has been writing", "have been writing"], correctAnswer: "has been writing", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 45, type: 'mc', question: "They ___ (clean) the house, and it looks great now.", options: ["have cleaned", "have been cleaning", "has cleaned"], correctAnswer: "have cleaned", hint: "Ênfase no resultado (casa limpa), use Present Perfect Simples." },
        { id: 46, type: 'mc', question: "They ___ (clean) the house for two hours.", options: ["have cleaned", "have been cleaning", "has been cleaning"], correctAnswer: "have been cleaning", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 47, type: 'mc', question: "He ___ (fix) his car, so he can drive it now.", options: ["has fixed", "has been fixing", "have fixed"], correctAnswer: "has fixed", hint: "Ênfase no resultado (carro consertado), use Present Perfect Simples." },
        { id: 48, type: 'mc', question: "He ___ (fix) his car since morning.", options: ["has fixed", "has been fixing", "have been fixing"], correctAnswer: "has been fixing", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 49, type: 'mc', question: "We ___ (live) here for ten years.", options: ["have lived", "have been living", "has lived"], correctAnswer: "have been living", hint: "Ação que começou no passado e continua, com ênfase na duração, use Present Perfect Continuous." },
        { id: 50, type: 'mc', question: "I ___ (finish) my report.", options: ["have finished", "have been finishing", "has finished"], correctAnswer: "have finished", hint: "Ênfase no resultado (relatório finalizado), use Present Perfect Simples." },
        { id: 51, type: 'mc', question: "I ___ (work) on my report all day.", options: ["have worked", "have been working", "has been working"], correctAnswer: "have been working", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 52, type: 'mc', question: "She ___ (learn) to play the guitar.", options: ["has learned", "has been learning", "have learned"], correctAnswer: "has learned", hint: "Ênfase no resultado (ela aprendeu), use Present Perfect Simples." },
        { id: 53, type: 'mc', question: "She ___ (learn) to play the guitar for six months.", options: ["has learned", "has been learning", "have been learning"], correctAnswer: "has been learning", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 54, type: 'mc', question: "They ___ (travel) to many countries.", options: ["have traveled", "have been traveling", "has traveled"], correctAnswer: "have traveled", hint: "Ênfase na experiência (quantos países), use Present Perfect Simples." },
        { id: 55, type: 'mc', question: "They ___ (travel) around the world for a year.", options: ["have traveled", "have been traveling", "has been traveling"], correctAnswer: "have been traveling", hint: "Ênfase na duração da atividade, use Present Perfect Continuous." },
        { id: 56, type: 'mc', question: "The ground is wet because it ___ (rain).", options: ["has rained", "has been raining", "have rained"], correctAnswer: "has been raining", hint: "Ação que começou no passado e tem evidência no presente, com ênfase na atividade, use Present Perfect Continuous." },
        { id: 57, type: 'mc', question: "It ___ (rain) a lot this week.", options: ["has rained", "has been raining", "have rained"], correctAnswer: "has rained", hint: "Ênfase na quantidade (muita chuva), use Present Perfect Simples." },
        { id: 58, type: 'mc', question: "I'm tired because I ___ (run).", options: ["have run", "have been running", "has run"], correctAnswer: "have been running", hint: "Ação que causou o estado atual (cansaço), com ênfase na atividade, use Present Perfect Continuous." },
        { id: 59, type: 'mc', question: "I ___ (run) five kilometers.", options: ["have run", "have been running", "has run"], correctAnswer: "have run", hint: "Ênfase no resultado (distância percorrida), use Present Perfect Simples." },
        { id: 60, type: 'mc', question: "She ___ (wait) for the bus for twenty minutes.", options: ["has waited", "has been waiting", "have waited"], correctAnswer: "has been waiting", hint: "Ação que começou no passado e continua, com ênfase na duração, use Present Perfect Continuous." },

        // --- NEGATIVOS: ESTRUTURA BÁSICA (HAVEN'T/HASN'T + BEEN + VERBO-ING) (20 mc) ---
        { id: 61, type: 'mc', question: "I ___ (not/study) English for long.", options: ["haven't studied", "haven't been studying", "hasn't been studying"], correctAnswer: "haven't been studying", hint: "'I' usa 'haven't been' + verbo com '-ing'." },
        { id: 62, type: 'mc', question: "She ___ (not/work) here for a year.", options: ["hasn't worked", "hasn't been working", "haven't been working"], correctAnswer: "hasn't been working", hint: "'She' usa 'hasn't been' + verbo com '-ing'." },
        { id: 63, type: 'mc', question: "They ___ (not/play) soccer for a while.", options: ["haven't played", "haven't been playing", "hasn't been playing"], correctAnswer: "haven't been playing", hint: "'They' usa 'haven't been' + verbo com '-ing'." },
        { id: 64, type: 'mc', question: "We ___ (not/wait) for you.", options: ["haven't waited", "haven't been waiting", "hasn't been waiting"], correctAnswer: "haven't been waiting", hint: "'We' usa 'haven't been' + verbo com '-ing'." },
        { id: 65, type: 'mc', question: "He ___ (not/read) that book.", options: ["hasn't read", "hasn't been reading", "haven't been reading"], correctAnswer: "hasn't been reading", hint: "'He' usa 'hasn't been' + verbo com '-ing'." },
        { id: 66, type: 'mc', question: "You ___ (not/talk) on the phone.", options: ["haven't talked", "haven't been talking", "hasn't been talking"], correctAnswer: "haven't been talking", hint: "'You' usa 'haven't been' + verbo com '-ing'." },
        { id: 67, type: 'mc', question: "It ___ (not/rain) much lately.", options: ["hasn't rained", "hasn't been raining", "haven't been raining"], correctAnswer: "hasn't been raining", hint: "'It' usa 'hasn't been' + verbo com '-ing'." },
        { id: 68, type: 'mc', question: "The children ___ (not/sleep) well.", options: ["haven't slept", "haven't been sleeping", "hasn't been sleeping"], correctAnswer: "haven't been sleeping", hint: "'The children' (plural) usa 'haven't been' + verbo com '-ing'." },
        { id: 69, type: 'mc', question: "My brother ___ (not/travel) recently.", options: ["hasn't traveled", "hasn't been traveling", "haven't been traveling"], correctAnswer: "hasn't been traveling", hint: "'My brother' usa 'hasn't been' + verbo com '-ing'." },
        { id: 70, type: 'mc', question: "I ___ (not/live) in this city for long.", options: ["haven't lived", "haven't been living", "hasn't been living"], correctAnswer: "haven't been living", hint: "'I' usa 'haven't been' + verbo com '-ing'." },
        { id: 71, type: 'mc', question: "She ___ (not/cook) dinner.", options: ["hasn't cooked", "hasn't been cooking", "haven't been cooking"], correctAnswer: "hasn't been cooking", hint: "'She' usa 'hasn't been' + verbo com '-ing'." },
        { id: 72, type: 'mc', question: "They ___ (not/build) a new house.", options: ["haven't built", "haven't been building", "hasn't been building"], correctAnswer: "haven't been building", hint: "'They' usa 'haven't been' + verbo com '-ing'." },
        { id: 73, type: 'mc', question: "We ___ (not/learn) French.", options: ["haven't learned", "haven't been learning", "hasn't been learning"], correctAnswer: "haven't been learning", hint: "'We' usa 'haven't been' + verbo com '-ing'." },
        { id: 74, type: 'mc', question: "He ___ (not/drive) for hours.", options: ["hasn't driven", "hasn't been driving", "haven't been driving"], correctAnswer: "hasn't been driving", hint: "'He' usa 'hasn't been' + verbo com '-ing'." },
        { id: 75, type: 'mc', question: "You ___ (not/write) that report.", options: ["haven't written", "haven't been writing", "hasn't been writing"], correctAnswer: "haven't been writing", hint: "'You' usa 'haven't been' + verbo com '-ing'." },
        { id: 76, type: 'mc', question: "The dog ___ (not/bark) all night.", options: ["hasn't barked", "hasn't been barking", "haven't been barking"], correctAnswer: "hasn't been barking", hint: "'The dog' (singular) usa 'hasn't been' + verbo com '-ing'." },
        { id: 77, type: 'mc', question: "My parents ___ (not/garden) today.", options: ["haven't gardened", "haven't been gardening", "hasn't been gardening"], correctAnswer: "haven't been gardening", hint: "'My parents' (plural) usa 'haven't been' + verbo com '-ing'." },
        { id: 78, type: 'mc', question: "I ___ (not/try) to call you.", options: ["haven't tried", "haven't been trying", "hasn't been trying"], correctAnswer: "haven't been trying", hint: "'I' usa 'haven't been' + verbo com '-ing'." },
        { id: 79, type: 'mc', question: "She ___ (not/teach) English.", options: ["hasn't taught", "hasn't been teaching", "haven't been teaching"], correctAnswer: "hasn't been teaching", hint: "'She' usa 'hasn't been' + verbo com '-ing'." },
        { id: 80, type: 'mc', question: "They ___ (not/argue) about it.", options: ["haven't argued", "haven't been arguing", "hasn't been arguing"], correctAnswer: "haven't been arguing", hint: "'They' usa 'haven't been' + verbo com '-ing'." },

        // --- NEGATIVOS: REESCRITA (20 rewrite) ---
        { id: 81, type: 'rewrite', question: "Rewrite in the negative form: I have been studying English for three hours.", correctAnswer: "I haven't been studying English for three hours.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 82, type: 'rewrite', question: "Rewrite in the negative form: She has been working here since 2020.", correctAnswer: "She hasn't been working here since 2020.", hint: "Use 'hasn't been' + verbo com '-ing'." },
        { id: 83, type: 'rewrite', question: "Rewrite in the negative form: They have been playing soccer all afternoon.", correctAnswer: "They haven't been playing soccer all afternoon.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 84, type: 'rewrite', question: "Rewrite in the negative form: We have been waiting for you for an hour.", correctAnswer: "We haven't been waiting for you for an hour.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 85, type: 'rewrite', question: "Rewrite in the negative form: He has been reading that book all morning.", correctAnswer: "He hasn't been reading that book all morning.", hint: "Use 'hasn't been' + verbo com '-ing'." },
        { id: 86, type: 'rewrite', question: "Rewrite in the negative form: You have been talking on the phone for a long time.", correctAnswer: "You haven't been talking on the phone for a long time.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 87, type: 'rewrite', question: "Rewrite in the negative form: It has been raining since morning.", correctAnswer: "It hasn't been raining since morning.", hint: "Use 'hasn't been' + verbo com '-ing'." },
        { id: 88, type: 'rewrite', question: "Rewrite in the negative form: The children have been sleeping for ten hours.", correctAnswer: "The children haven't been sleeping for ten hours.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 89, type: 'rewrite', question: "Rewrite in the negative form: My brother has been traveling for six months.", correctAnswer: "My brother hasn't been traveling for six months.", hint: "Use 'hasn't been' + verbo com '-ing'." },
        { id: 90, type: 'rewrite', question: "Rewrite in the negative form: I have been living in this city since my birth.", correctAnswer: "I haven't been living in this city since my birth.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 91, type: 'rewrite', question: "Rewrite in the negative form: She has been cooking dinner for two hours.", correctAnswer: "She hasn't been cooking dinner for two hours.", hint: "Use 'hasn't been' + verbo com '-ing'." },
        { id: 92, type: 'rewrite', question: "Rewrite in the negative form: They have been building a new house for a year.", correctAnswer: "They haven't been building a new house for a year.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 93, type: 'rewrite', question: "Rewrite in the negative form: We have been learning French for a year now.", correctAnswer: "We haven't been learning French for a year now.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 94, type: 'rewrite', question: "Rewrite in the negative form: He has been driving since 5 AM.", correctAnswer: "He hasn't been driving since 5 AM.", hint: "Use 'hasn't been' + verbo com '-ing'." },
        { id: 95, type: 'rewrite', question: "Rewrite in the negative form: You have been writing that report all day.", correctAnswer: "You haven't been writing that report all day.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 96, type: 'rewrite', question: "Rewrite in the negative form: The dog has been barking for twenty minutes.", correctAnswer: "The dog hasn't been barking for twenty minutes.", hint: "Use 'hasn't been' + verbo com '-ing'." },
        { id: 97, type: 'rewrite', question: "Rewrite in the negative form: My parents have been gardening since early morning.", correctAnswer: "My parents haven't been gardening since early morning.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 98, type: 'rewrite', question: "Rewrite in the negative form: I have been trying to call you all day.", correctAnswer: "I haven't been trying to call you all day.", hint: "Use 'haven't been' + verbo com '-ing'." },
        { id: 99, type: 'rewrite', question: "Rewrite in the negative form: She has been teaching English for ten years.", correctAnswer: "She hasn't been teaching English for ten years.", hint: "Use 'hasn't been' + verbo com '-ing'." },
        { id: 100, type: 'rewrite', question: "Rewrite in the negative form: They have been arguing about it for an hour.", correctAnswer: "They haven't been arguing about it for an hour.", hint: "Use 'haven't been' + verbo com '-ing'." },

        // --- NEGATIVOS: CONTRASTE COM PRESENT PERFECT SIMPLES (20 mc) ---
        { id: 101, type: 'mc', question: "I ___ (not/read) any books this month.", options: ["haven't read", "haven't been reading", "hasn't read"], correctAnswer: "haven't read", hint: "Ênfase na ausência de resultado, use Present Perfect Simples." },
        { id: 102, type: 'mc', question: "I ___ (not/read) for long.", options: ["haven't read", "haven't been reading", "hasn't been reading"], correctAnswer: "haven't been reading", hint: "Ênfase na ausência de duração da atividade, use Present Perfect Continuous." },
        { id: 103, type: 'mc', question: "She ___ (not/write) any emails today.", options: ["hasn't written", "hasn't been writing", "haven't written"], correctAnswer: "hasn't written", hint: "Ênfase na ausência de resultado, use Present Perfect Simples." },
        { id: 104, type: 'mc', question: "She ___ (not/write) emails all morning.", options: ["hasn't written", "hasn't been writing", "haven't been writing"], correctAnswer: "hasn't been writing", hint: "Ênfase na ausência de duração da atividade, use Present Perfect Continuous." },
        { id: 105, type: 'mc', question: "They ___ (not/clean) the house yet.", options: ["haven't cleaned", "haven't been cleaning", "hasn't cleaned"], correctAnswer: "haven't cleaned", hint: "Ênfase na ausência de resultado, use Present Perfect Simples." },
        { id: 106, type: 'mc', question: "They ___ (not/clean) the house for long.", options: ["haven't cleaned", "haven't been cleaning", "hasn't been cleaning"], correctAnswer: "haven't been cleaning", hint: "Ênfase na ausência de duração da atividade, use Present Perfect Continuous." },
        { id: 107, type: 'mc', question: "He ___ (not/fix) his car yet.", options: ["hasn't fixed", "hasn't been fixing", "haven't fixed"], correctAnswer: "hasn't fixed", hint: "Ênfase na ausência de resultado, use Present Perfect Simples." },
        { id: 108, type: 'mc', question: "He ___ (not/fix) his car for a while.", options: ["hasn't fixed", "hasn't been fixing", "haven't been fixing"], correctAnswer: "hasn't been fixing", hint: "Ênfase na ausência de duração da atividade, use Present Perfect Continuous." },
        { id: 109, type: 'mc', question: "We ___ (not/live) here for ten years.", options: ["haven't lived", "haven't been living", "hasn't lived"], correctAnswer: "haven't been living", hint: "Ação que começou no passado e continua, com ênfase na duração, use Present Perfect Continuous." },
        { id: 110, type: 'mc', question: "I ___ (not/finish) my report yet.", options: ["haven't finished", "haven't been finishing", "hasn't finished"], correctAnswer: "haven't finished", hint: "Ênfase na ausência de resultado, use Present Perfect Simples." },
        { id: 111, type: 'mc', question: "I ___ (not/work) on my report for long.", options: ["haven't worked", "haven't been working", "hasn't been working"], correctAnswer: "haven't been working", hint: "Ênfase na ausência de duração da atividade, use Present Perfect Continuous." },
        { id: 112, type: 'mc', question: "She ___ (not/learn) to play the guitar yet.", options: ["hasn't learned", "hasn't been learning", "haven't learned"], correctAnswer: "hasn't learned", hint: "Ênfase na ausência de resultado, use Present Perfect Simples." },
        { id: 113, type: 'mc', question: "She ___ (not/learn) to play the guitar for long.", options: ["hasn't learned", "hasn't been learning", "haven't been learning"], correctAnswer: "hasn't been learning", hint: "Ênfase na ausência de duração da atividade, use Present Perfect Continuous." },
        { id: 114, type: 'mc', question: "They ___ (not/travel) to many countries yet.", options: ["haven't traveled", "haven't been traveling", "hasn't traveled"], correctAnswer: "haven't traveled", hint: "Ênfase na ausência de experiência, use Present Perfect Simples." },
        { id: 115, type: 'mc', question: "They ___ (not/travel) around the world for a year.", options: ["haven't traveled", "haven't been traveling", "hasn't been traveling"], correctAnswer: "haven't been traveling", hint: "Ênfase na ausência de duração da atividade, use Present Perfect Continuous." },
        { id: 116, type: 'mc', question: "It ___ (not/rain) much this week.", options: ["hasn't rained", "hasn't been raining", "haven't rained"], correctAnswer: "hasn't rained", hint: "Ênfase na ausência de quantidade, use Present Perfect Simples." },
        { id: 117, type: 'mc', question: "I ___ (not/run) five kilometers yet.", options: ["haven't run", "haven't been running", "hasn't run"], correctAnswer: "haven't run", hint: "Ênfase na ausência de resultado, use Present Perfect Simples." },
        { id: 118, type: 'mc', question: "I ___ (not/run) for long.", options: ["haven't run", "haven't been running", "hasn't run"], correctAnswer: "haven't been running", hint: "Ênfase na ausência de duração da atividade, use Present Perfect Continuous." },
        { id: 119, type: 'mc', question: "She ___ (not/wait) for the bus for twenty minutes.", options: ["hasn't waited", "hasn't been waiting", "haven't waited"], correctAnswer: "hasn't been waiting", hint: "Ação que começou no passado e continua, com ênfase na duração, use Present Perfect Continuous." },
        { id: 120, type: 'mc', question: "She ___ (not/wait) for the bus yet.", options: ["hasn't waited", "hasn't been waiting", "haven't waited"], correctAnswer: "hasn't waited", hint: "Ênfase na ausência de resultado, use Present Perfect Simples." },

        // --- INTERROGATIVOS: ESTRUTURA BÁSICA (HAVE/HAS + SUJEITO + BEEN + VERBO-ING) (20 mc) ---
        { id: 121, type: 'mc', question: "___ you been studying English for three hours?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'You' usa 'Have' no início da pergunta." },
        { id: 122, type: 'mc', question: "___ she been working here since 2020?", options: ["Have", "Has", "Did"], correctAnswer: "Has", hint: "'She' usa 'Has' no início da pergunta." },
        { id: 123, type: 'mc', question: "___ they been playing soccer all afternoon?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'They' usa 'Have' no início da pergunta." },
        { id: 124, type: 'mc', question: "___ we been waiting for you for an hour?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'We' usa 'Have' no início da pergunta." },
        { id: 125, type: 'mc', question: "___ he been reading that book all morning?", options: ["Have", "Has", "Did"], correctAnswer: "Has", hint: "'He' usa 'Has' no início da pergunta." },
        { id: 126, type: 'mc', question: "___ you been talking on the phone for a long time?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'You' usa 'Have' no início da pergunta." },
        { id: 127, type: 'mc', question: "___ it been raining since morning?", options: ["Have", "Has", "Did"], correctAnswer: "Has", hint: "'It' usa 'Has' no início da pergunta." },
        { id: 128, type: 'mc', question: "___ the children been sleeping for ten hours?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'The children' (plural) usa 'Have' no início da pergunta." },
        { id: 129, type: 'mc', question: "___ your brother been traveling for six months?", options: ["Have", "Has", "Did"], correctAnswer: "Has", hint: "'Your brother' usa 'Has' no início da pergunta." },
        { id: 130, type: 'mc', question: "___ I been living in this city for long?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'I' usa 'Have' no início da pergunta." },
        { id: 131, type: 'mc', question: "___ she been cooking dinner for two hours?", options: ["Have", "Has", "Did"], correctAnswer: "Has", hint: "'She' usa 'Has' no início da pergunta." },
        { id: 132, type: 'mc', question: "___ they been building a new house for a year?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'They' usa 'Have' no início da pergunta." },
        { id: 133, type: 'mc', question: "___ we been learning French for a year now?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'We' usa 'Have' no início da pergunta." },
        { id: 134, type: 'mc', question: "___ he been driving since 5 AM?", options: ["Have", "Has", "Did"], correctAnswer: "Has", hint: "'He' usa 'Has' no início da pergunta." },
        { id: 135, type: 'mc', question: "___ you been writing that report all day?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'You' usa 'Have' no início da pergunta." },
        { id: 136, type: 'mc', question: "___ the dog been barking for twenty minutes?", options: ["Have", "Has", "Did"], correctAnswer: "Has", hint: "'The dog' (singular) usa 'Has' no início da pergunta." },
        { id: 137, type: 'mc', question: "___ your parents been gardening since early morning?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'Your parents' (plural) usa 'Have' no início da pergunta." },
        { id: 138, type: 'mc', question: "___ I been trying to call you all day?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'I' usa 'Have' no início da pergunta." },
        { id: 139, type: 'mc', question: "___ she been teaching English for ten years?", options: ["Have", "Has", "Did"], correctAnswer: "Has", hint: "'She' usa 'Has' no início da pergunta." },
        { id: 140, type: 'mc', question: "___ they been arguing about it for an hour?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'They' usa 'Have' no início da pergunta." },

        // --- INTERROGATIVOS: PALAVRAS-CHAVE E CONTRASTE COM PRESENT PERFECT SIMPLES (20 mc) ---
        { id: 141, type: 'mc', question: "___ long have you been studying?", options: ["How", "What", "When"], correctAnswer: "How", hint: "'How long' pergunta sobre duração." },
        { id: 142, type: 'mc', question: "___ she finished her homework?", options: ["Has", "Have", "Did"], correctAnswer: "Has", hint: "Pergunta sobre o resultado, use Present Perfect Simples." },
        { id: 143, type: 'mc', question: "___ she been doing her homework all afternoon?", options: ["Has", "Have", "Did"], correctAnswer: "Has", hint: "Pergunta sobre a duração da atividade, use Present Perfect Continuous." },
        { id: 144, type: 'mc', question: "___ you read any good books lately?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre experiência/resultado, use Present Perfect Simples." },
        { id: 145, type: 'mc', question: "___ you been reading that book for a week?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre a duração da atividade, use Present Perfect Continuous." },
        { id: 146, type: 'mc', question: "___ they cleaned the house yet?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre o resultado, use Present Perfect Simples." },
        { id: 147, type: 'mc', question: "___ they been cleaning the house for hours?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre a duração da atividade, use Present Perfect Continuous." },
        { id: 148, type: 'mc', question: "___ he fixed his car?", options: ["Has", "Have", "Did"], correctAnswer: "Has", hint: "Pergunta sobre o resultado, use Present Perfect Simples." },
        { id: 149, type: 'mc', question: "___ he been fixing his car since morning?", options: ["Has", "Have", "Did"], correctAnswer: "Has", hint: "Pergunta sobre a duração da atividade, use Present Perfect Continuous." },
        { id: 150, type: 'mc', question: "___ you lived here for ten years?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre a duração da ação que continua, use Present Perfect Continuous." },
        { id: 151, type: 'mc', question: "___ you finished your report?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre o resultado, use Present Perfect Simples." },
        { id: 152, type: 'mc', question: "___ you been working on your report all day?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre a duração da atividade, use Present Perfect Continuous." },
        { id: 153, type: 'mc', question: "___ she learned to play the guitar?", options: ["Has", "Have", "Did"], correctAnswer: "Has", hint: "Pergunta sobre o resultado, use Present Perfect Simples." },
        { id: 154, type: 'mc', question: "___ she been learning to play the guitar for six months?", options: ["Has", "Have", "Did"], correctAnswer: "Has", hint: "Pergunta sobre a duração da atividade, use Present Perfect Continuous." },
        { id: 155, type: 'mc', question: "___ they traveled to many countries?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre experiência/resultado, use Present Perfect Simples." },
        { id: 156, type: 'mc', question: "___ they been traveling around the world for a year?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre a duração da atividade, use Present Perfect Continuous." },
        { id: 157, type: 'mc', question: "___ it rained a lot this week?", options: ["Has", "Have", "Did"], correctAnswer: "Has", hint: "Pergunta sobre a quantidade/resultado, use Present Perfect Simples." },
        { id: 158, type: 'mc', question: "___ it been raining for hours?", options: ["Has", "Have", "Did"], correctAnswer: "Has", hint: "Pergunta sobre a duração da atividade, use Present Perfect Continuous." },
        { id: 159, type: 'mc', question: "___ you run five kilometers?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre o resultado, use Present Perfect Simples." },
        { id: 160, type: 'mc', question: "___ you been running for a long time?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "Pergunta sobre a duração da atividade, use Present Perfect Continuous." },

        // --- INTERROGATIVOS: REESCRITA (20 rewrite) ---
        { id: 161, type: 'rewrite', question: "Rewrite in the interrogative form: You have been studying English for three hours.", correctAnswer: "Have you been studying English for three hours?", hint: "Coloque 'Have' antes de 'you'." },
        { id: 162, type: 'rewrite', question: "Rewrite in the interrogative form: She has been working here since 2020.", correctAnswer: "Has she been working here since 2020?", hint: "Coloque 'Has' antes de 'she'." },
        { id: 163, type: 'rewrite', question: "Rewrite in the interrogative form: They have been playing soccer all afternoon.", correctAnswer: "Have they been playing soccer all afternoon?", hint: "Coloque 'Have' antes de 'they'." },
        { id: 164, type: 'rewrite', question: "Rewrite in the interrogative form: We have been waiting for you for an hour.", correctAnswer: "Have we been waiting for you for an hour?", hint: "Coloque 'Have' antes de 'we'." },
        { id: 165, type: 'rewrite', question: "Rewrite in the interrogative form: He has been reading that book all morning.", correctAnswer: "Has he been reading that book all morning?", hint: "Coloque 'Has' antes de 'he'." },
        { id: 166, type: 'rewrite', question: "Rewrite in the interrogative form: You have been talking on the phone for a long time.", correctAnswer: "Have you been talking on the phone for a long time?", hint: "Coloque 'Have' antes de 'you'." },
        { id: 167, type: 'rewrite', question: "Rewrite in the interrogative form: It has been raining since morning.", correctAnswer: "Has it been raining since morning?", hint: "Coloque 'Has' antes de 'it'." },
        { id: 168, type: 'rewrite', question: "Rewrite in the interrogative form: The children have been sleeping for ten hours.", correctAnswer: "Have the children been sleeping for ten hours?", hint: "Coloque 'Have' antes de 'the children'." },
        { id: 169, type: 'rewrite', question: "Rewrite in the interrogative form: My brother has been traveling for six months.", correctAnswer: "Has your brother been traveling for six months?", hint: "Coloque 'Has' antes de 'your brother'." },
        { id: 170, type: 'rewrite', question: "Rewrite in the interrogative form: I have been living in this city for long.", correctAnswer: "Have I been living in this city for long?", hint: "Coloque 'Have' antes de 'I'." },
        { id: 171, type: 'rewrite', question: "Rewrite in the interrogative form: She has been cooking dinner for two hours.", correctAnswer: "Has she been cooking dinner for two hours?", hint: "Coloque 'Has' antes de 'she'." },
        { id: 172, type: 'rewrite', question: "Rewrite in the interrogative form: They have been building a new house for a year.", correctAnswer: "Have they been building a new house for a year?", hint: "Coloque 'Have' antes de 'they'." },
        { id: 173, type: 'rewrite', question: "Rewrite in the interrogative form: We have been learning French for a year now.", correctAnswer: "Have we been learning French for a year now?", hint: "Coloque 'Have' antes de 'we'." },
        { id: 174, type: 'rewrite', question: "Rewrite in the interrogative form: He has been driving since 5 AM.", correctAnswer: "Has he been driving since 5 AM?", hint: "Coloque 'Has' antes de 'he'." },
        { id: 175, type: 'rewrite', question: "Rewrite in the interrogative form: You have been writing that report all day.", correctAnswer: "Have you been writing that report all day?", hint: "Coloque 'Have' antes de 'you'." },
        { id: 176, type: 'rewrite', question: "Rewrite in the interrogative form: The dog has been barking for twenty minutes.", correctAnswer: "Has the dog been barking for twenty minutes?", hint: "Coloque 'Has' antes de 'the dog'." },
        { id: 177, type: 'rewrite', question: "Rewrite in the interrogative form: My parents have been gardening since early morning.", correctAnswer: "Have your parents been gardening since early morning?", hint: "Coloque 'Have' antes de 'your parents'." },
        { id: 178, type: 'rewrite', question: "Rewrite in the interrogative form: I have been trying to call you all day.", correctAnswer: "Have I been trying to call you all day?", hint: "Coloque 'Have' antes de 'I'." },
        { id: 179, type: 'rewrite', question: "Rewrite in the interrogative form: She has been teaching English for ten years.", correctAnswer: "Has she been teaching English for ten years?", hint: "Coloque 'Has' antes de 'she'." },
        { id: 180, type: 'rewrite', question: "Rewrite in the interrogative form: They have been arguing about it for an hour.", correctAnswer: "Have they been arguing about it for an hour?", hint: "Coloque 'Have' antes de 'they'." }
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
