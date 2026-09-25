document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Present Perfect';

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = [];

    // --- EXERCÍCIOS AFIRMATIVOS E NEGATIVOS (120 exemplos) ---
    exercises = [
        // --- AFIRMATIVOS: HAS/HAVE + PARTICÍPIO (20 mc) ---
        { id: 1, type: 'mc', question: "I ___ (see) that movie already.", options: ["have seen", "has seen", "have see"], correctAnswer: "have seen", hint: "'I' usa 'have' + particípio ('seen')." },
        { id: 2, type: 'mc', question: "She ___ (go) to Paris twice.", options: ["have gone", "has gone", "has go"], correctAnswer: "has gone", hint: "'She' usa 'has' + particípio ('gone')." },
        { id: 3, type: 'mc', question: "They ___ (finish) their homework already.", options: ["has finished", "have finished", "have finish"], correctAnswer: "have finished", hint: "'They' usa 'have' + particípio ('finished')." },
        { id: 4, type: 'mc', question: "We ___ (live) here since 2010.", options: ["has lived", "have lived", "have live"], correctAnswer: "have lived", hint: "'We' usa 'have' + particípio ('lived')." },
        { id: 5, type: 'mc', question: "He ___ (eat) sushi before.", options: ["have eaten", "has eaten", "has eat"], correctAnswer: "has eaten", hint: "'He' usa 'has' + particípio ('eaten')." },
        { id: 6, type: 'mc', question: "You ___ (do) a great job.", options: ["has done", "have done", "have do"], correctAnswer: "have done", hint: "'You' usa 'have' + particípio ('done')." },
        { id: 7, type: 'mc', question: "I ___ (make) many mistakes in my life.", options: ["have made", "has made", "have make"], correctAnswer: "have made", hint: "'I' usa 'have' + particípio ('made')." },
        { id: 8, type: 'mc', question: "She ___ (write) three books.", options: ["have written", "has written", "has write"], correctAnswer: "has written", hint: "'She' usa 'has' + particípio ('written')." },
        { id: 9, type: 'mc', question: "They ___ (come) to visit us many times.", options: ["has come", "have come", "have came"], correctAnswer: "have come", hint: "'They' usa 'have' + particípio ('come')." },
        { id: 10, type: 'mc', question: "We ___ (take) that trip before.", options: ["has taken", "have taken", "have took"], correctAnswer: "have taken", hint: "'We' usa 'have' + particípio ('taken')." },
        { id: 11, type: 'mc', question: "He ___ (give) me advice many times.", options: ["have given", "has given", "has gave"], correctAnswer: "has given", hint: "'He' usa 'has' + particípio ('given')." },
        { id: 12, type: 'mc', question: "I ___ (have) many pets over the years.", options: ["have had", "has had", "have have"], correctAnswer: "have had", hint: "'I' usa 'have' + particípio ('had')." },
        { id: 13, type: 'mc', question: "She ___ (be) to Japan before.", options: ["have been", "has been", "has be"], correctAnswer: "has been", hint: "'She' usa 'has' + particípio ('been')." },
        { id: 14, type: 'mc', question: "They ___ (never/try) Thai food.", options: ["has never tried", "have never tried", "have never try"], correctAnswer: "have never tried", hint: "'They' usa 'have' + particípio ('tried')." },
        { id: 15, type: 'mc', question: "We ___ (already/clean) the house.", options: ["has already cleaned", "have already cleaned", "have already clean"], correctAnswer: "have already cleaned", hint: "'We' usa 'have' + particípio ('cleaned')." },
        { id: 16, type: 'mc', question: "He ___ (just/arrive) home.", options: ["have just arrived", "has just arrived", "has just arrive"], correctAnswer: "has just arrived", hint: "'He' usa 'has' + particípio ('arrived')." },
        { id: 17, type: 'mc', question: "I ___ (not/finish) my report yet.", options: ["haven't finished", "hasn't finished", "haven't finish"], correctAnswer: "haven't finished", hint: "'I' usa 'haven't' + particípio ('finished')." },
        { id: 18, type: 'mc', question: "She ___ (study) English for five years.", options: ["have studied", "has studied", "has study"], correctAnswer: "has studied", hint: "'She' usa 'has' + particípio ('studied')." },
        { id: 19, type: 'mc', question: "They ___ (know) each other since childhood.", options: ["has known", "have known", "have know"], correctAnswer: "have known", hint: "'They' usa 'have' + particípio ('known')." },
        { id: 20, type: 'mc', question: "We ___ (visit) that museum twice.", options: ["has visited", "have visited", "have visit"], correctAnswer: "have visited", hint: "'We' usa 'have' + particípio ('visited')." },

        // --- AFIRMATIVOS: PALAVRAS-CHAVE (20 mc) ---
        { id: 21, type: 'mc', question: "___ you ever been to London?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'Ever' é uma palavra-chave do Present Perfect; use 'Have' para 'you'." },
        { id: 22, type: 'mc', question: "I have ___ finished my homework.", options: ["already", "yesterday", "last week"], correctAnswer: "already", hint: "'Already' é uma palavra-chave típica do Present Perfect." },
        { id: 23, type: 'mc', question: "She has ___ arrived at the airport.", options: ["just", "ago", "yesterday"], correctAnswer: "just", hint: "'Just' indica uma ação muito recente, típica do Present Perfect." },
        { id: 24, type: 'mc', question: "Have they finished the project ___?", options: ["yet", "yesterday", "ago"], correctAnswer: "yet", hint: "'Yet' é usado em perguntas e negativas do Present Perfect." },
        { id: 25, type: 'mc', question: "We haven't seen that movie ___.", options: ["yet", "yesterday", "last night"], correctAnswer: "yet", hint: "'Yet' aparece em frases negativas do Present Perfect." },
        { id: 26, type: 'mc', question: "Has he ___ tried Brazilian food?", options: ["ever", "yesterday", "last year"], correctAnswer: "ever", hint: "'Ever' pergunta sobre experiência de vida, típico do Present Perfect." },
        { id: 27, type: 'mc', question: "I have ___ visited that city before.", options: ["never", "yesterday", "last month"], correctAnswer: "never", hint: "'Never' indica que a ação nunca aconteceu, típico do Present Perfect." },
        { id: 28, type: 'mc', question: "She has ___ finished her homework, so she can go out.", options: ["already", "yesterday", "ago"], correctAnswer: "already", hint: "'Already' é uma palavra-chave típica do Present Perfect." },
        { id: 29, type: 'mc', question: "They have ___ left the office.", options: ["just", "last week", "yesterday"], correctAnswer: "just", hint: "'Just' indica uma ação muito recente." },
        { id: 30, type: 'mc', question: "Have you ___ eaten sushi?", options: ["ever", "yesterday", "last year"], correctAnswer: "ever", hint: "'Ever' pergunta sobre experiência de vida." },
        { id: 31, type: 'mc', question: "We have lived here ___ 2015.", options: ["since", "for", "ago"], correctAnswer: "since", hint: "'Since' é usado com um ponto específico no tempo (o ano 2015)." },
        { id: 32, type: 'mc', question: "I have known her ___ ten years.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' é usado com um período de tempo (dez anos)." },
        { id: 33, type: 'mc', question: "He has worked here ___ 2018.", options: ["since", "for", "ago"], correctAnswer: "since", hint: "'Since' é usado com um ponto específico no tempo." },
        { id: 34, type: 'mc', question: "She has studied English ___ five years.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' é usado com um período de tempo." },
        { id: 35, type: 'mc', question: "They have been friends ___ they were children.", options: ["since", "for", "ago"], correctAnswer: "since", hint: "'Since' pode introduzir também uma oração ('since they were children')." },
        { id: 36, type: 'mc', question: "I ___ (not/see) him yet.", options: ["haven't seen", "hasn't seen", "didn't see"], correctAnswer: "haven't seen", hint: "'I' usa 'haven't' + particípio; 'yet' confirma que é Present Perfect." },
        { id: 37, type: 'mc', question: "She has ___ finished the book.", options: ["already", "yesterday", "last week"], correctAnswer: "already", hint: "'Already' confirma o uso do Present Perfect." },
        { id: 38, type: 'mc', question: "___ you ever tried skydiving?", options: ["Have", "Has", "Did"], correctAnswer: "Have", hint: "'Ever' + 'you' pede 'Have'." },
        { id: 39, type: 'mc', question: "We have ___ met before, I think.", options: ["already", "yesterday", "ago"], correctAnswer: "already", hint: "'Already' confirma o uso do Present Perfect." },
        { id: 40, type: 'mc', question: "He hasn't called me ___.", options: ["yet", "yesterday", "last night"], correctAnswer: "yet", hint: "'Yet' em frases negativas confirma o Present Perfect." },

        // --- AFIRMATIVOS: CONTRASTE COM SIMPLE PAST (20 mc) ---
        { id: 41, type: 'mc', question: "I ___ (see) that movie yesterday.", options: ["saw", "have seen", "has seen"], correctAnswer: "saw", hint: "'Yesterday' é um tempo específico, então use Simple Past ('saw')." },
        { id: 42, type: 'mc', question: "I ___ (see) that movie already.", options: ["saw", "have seen", "has seen"], correctAnswer: "have seen", hint: "Sem tempo específico + 'already' indica Present Perfect." },
        { id: 43, type: 'mc', question: "She ___ (go) to Paris last year.", options: ["went", "have gone", "has gone"], correctAnswer: "went", hint: "'Last year' é um tempo específico, use Simple Past." },
        { id: 44, type: 'mc', question: "She ___ (go) to Paris twice in her life.", options: ["went", "have gone", "has gone"], correctAnswer: "has gone", hint: "'In her life' indica experiência, sem tempo específico, use Present Perfect." },
        { id: 45, type: 'mc', question: "We ___ (finish) the project last week.", options: ["finished", "have finished", "has finished"], correctAnswer: "finished", hint: "'Last week' é um tempo específico, use Simple Past." },
        { id: 46, type: 'mc', question: "We ___ (finish) the project already.", options: ["finished", "have finished", "has finished"], correctAnswer: "have finished", hint: "'Already' sem tempo específico indica Present Perfect." },
        { id: 47, type: 'mc', question: "He ___ (eat) sushi two days ago.", options: ["ate", "have eaten", "has eaten"], correctAnswer: "ate", hint: "'Two days ago' é um tempo específico, use Simple Past." },
        { id: 48, type: 'mc', question: "He ___ (eat) sushi before.", options: ["ate", "have eaten", "has eaten"], correctAnswer: "has eaten", hint: "'Before' sem tempo específico indica experiência, use Present Perfect." },
        { id: 49, type: 'mc', question: "They ___ (visit) London in 2019.", options: ["visited", "have visited", "has visited"], correctAnswer: "visited", hint: "'In 2019' é um tempo específico, use Simple Past." },
        { id: 50, type: 'mc', question: "They ___ (visit) London several times.", options: ["visited", "have visited", "has visited"], correctAnswer: "have visited", hint: "'Several times' sem tempo específico indica Present Perfect." },
        { id: 51, type: 'mc', question: "I ___ (write) that email an hour ago.", options: ["wrote", "have written", "has written"], correctAnswer: "wrote", hint: "'An hour ago' é um tempo específico, use Simple Past." },
        { id: 52, type: 'mc', question: "I ___ (write) three emails so far today.", options: ["wrote", "have written", "has written"], correctAnswer: "have written", hint: "Ação com resultado no presente, sem tempo específico, use Present Perfect." },
        { id: 53, type: 'mc', question: "She ___ (lose) her keys yesterday.", options: ["lost", "have lost", "has lost"], correctAnswer: "lost", hint: "'Yesterday' é um tempo específico, use Simple Past." },
        { id: 54, type: 'mc', question: "She ___ (lose) her keys, so she can't get in.", options: ["lost", "have lost", "has lost"], correctAnswer: "has lost", hint: "A ação passada tem influência no presente (não consegue entrar), use Present Perfect." },
        { id: 55, type: 'mc', question: "We ___ (live) in Rio for two years, and we still live there.", options: ["lived", "have lived", "has lived"], correctAnswer: "have lived", hint: "Ação que começou no passado e continua até agora, use Present Perfect." },
        { id: 56, type: 'mc', question: "We ___ (live) in Rio for two years, then we moved.", options: ["lived", "have lived", "has lived"], correctAnswer: "lived", hint: "A ação terminou no passado (depois se mudaram), use Simple Past." },
        { id: 57, type: 'mc', question: "He ___ (break) his arm last month.", options: ["broke", "have broken", "has broken"], correctAnswer: "broke", hint: "'Last month' é um tempo específico, use Simple Past." },
        { id: 58, type: 'mc', question: "He ___ (break) his arm, so he can't play today.", options: ["broke", "have broken", "has broken"], correctAnswer: "has broken", hint: "A ação passada tem influência no presente (não pode jogar), use Present Perfect." },
        { id: 59, type: 'mc', question: "I ___ (not/finish) my homework yet.", options: ["didn't finish", "haven't finished", "hasn't finished"], correctAnswer: "haven't finished", hint: "'Yet' indica Present Perfect; 'I' usa 'haven't'." },
        { id: 60, type: 'mc', question: "I ___ (not/finish) my homework last night.", options: ["didn't finish", "haven't finished", "hasn't finished"], correctAnswer: "didn't finish", hint: "'Last night' é um tempo específico, use Simple Past negativo." },

        // --- NEGATIVOS: HASN'T/HAVEN'T + PARTICÍPIO (20 mc) ---
        { id: 61, type: 'mc', question: "I ___ (not/see) that movie yet.", options: ["haven't seen", "hasn't seen", "haven't see"], correctAnswer: "haven't seen", hint: "'I' usa 'haven't' + particípio ('seen')." },
        { id: 62, type: 'mc', question: "She ___ (not/go) to Paris yet.", options: ["haven't gone", "hasn't gone", "hasn't go"], correctAnswer: "hasn't gone", hint: "'She' usa 'hasn't' + particípio ('gone')." },
        { id: 63, type: 'mc', question: "They ___ (not/finish) their homework yet.", options: ["hasn't finished", "haven't finished", "haven't finish"], correctAnswer: "haven't finished", hint: "'They' usa 'haven't' + particípio ('finished')." },
        { id: 64, type: 'mc', question: "We ___ (not/live) here for very long.", options: ["hasn't lived", "haven't lived", "haven't live"], correctAnswer: "haven't lived", hint: "'We' usa 'haven't' + particípio ('lived')." },
        { id: 65, type: 'mc', question: "He ___ (not/eat) sushi before.", options: ["haven't eaten", "hasn't eaten", "hasn't eat"], correctAnswer: "hasn't eaten", hint: "'He' usa 'hasn't' + particípio ('eaten')." },
        { id: 66, type: 'mc', question: "You ___ (not/do) your homework yet.", options: ["hasn't done", "haven't done", "haven't do"], correctAnswer: "haven't done", hint: "'You' usa 'haven't' + particípio ('done')." },
        { id: 67, type: 'mc', question: "I ___ (not/make) that mistake before.", options: ["haven't made", "hasn't made", "haven't make"], correctAnswer: "haven't made", hint: "'I' usa 'haven't' + particípio ('made')." },
        { id: 68, type: 'mc', question: "She ___ (not/write) her essay yet.", options: ["haven't written", "hasn't written", "hasn't write"], correctAnswer: "hasn't written", hint: "'She' usa 'hasn't' + particípio ('written')." },
        { id: 69, type: 'mc', question: "They ___ (not/come) to visit us this year.", options: ["hasn't come", "haven't come", "haven't came"], correctAnswer: "haven't come", hint: "'They' usa 'haven't' + particípio ('come')." },
        { id: 70, type: 'mc', question: "We ___ (not/take) that trip yet.", options: ["hasn't taken", "haven't taken", "haven't took"], correctAnswer: "haven't taken", hint: "'We' usa 'haven't' + particípio ('taken')." },
        { id: 71, type: 'mc', question: "He ___ (not/give) me an answer yet.", options: ["haven't given", "hasn't given", "hasn't gave"], correctAnswer: "hasn't given", hint: "'He' usa 'hasn't' + particípio ('given')." },
        { id: 72, type: 'mc', question: "I ___ (not/have) time to call you.", options: ["haven't had", "hasn't had", "haven't have"], correctAnswer: "haven't had", hint: "'I' usa 'haven't' + particípio ('had')." },
        { id: 73, type: 'mc', question: "She ___ (not/be) to Japan yet.", options: ["haven't been", "hasn't been", "hasn't be"], correctAnswer: "hasn't been", hint: "'She' usa 'hasn't' + particípio ('been')." },
        { id: 74, type: 'mc', question: "They ___ (not/try) Thai food yet.", options: ["hasn't tried", "haven't tried", "haven't try"], correctAnswer: "haven't tried", hint: "'They' usa 'haven't' + particípio ('tried')." },
        { id: 75, type: 'mc', question: "We ___ (not/clean) the house yet.", options: ["hasn't cleaned", "haven't cleaned", "haven't clean"], correctAnswer: "haven't cleaned", hint: "'We' usa 'haven't' + particípio ('cleaned')." },
        { id: 76, type: 'mc', question: "He ___ (not/arrive) home yet.", options: ["haven't arrived", "hasn't arrived", "hasn't arrive"], correctAnswer: "hasn't arrived", hint: "'He' usa 'hasn't' + particípio ('arrived')." },
        { id: 77, type: 'mc', question: "I ___ (not/finish) my report yet.", options: ["haven't finished", "hasn't finished", "didn't finish"], correctAnswer: "haven't finished", hint: "'I' usa 'haven't' + particípio ('finished')." },
        { id: 78, type: 'mc', question: "She ___ (not/study) for the test yet.", options: ["haven't studied", "hasn't studied", "hasn't study"], correctAnswer: "hasn't studied", hint: "'She' usa 'hasn't' + particípio ('studied')." },
        { id: 79, type: 'mc', question: "They ___ (not/know) each other for very long.", options: ["hasn't known", "haven't known", "haven't know"], correctAnswer: "haven't known", hint: "'They' usa 'haven't' + particípio ('known')." },
        { id: 80, type: 'mc', question: "We ___ (not/visit) that museum yet.", options: ["hasn't visited", "haven't visited", "haven't visit"], correctAnswer: "haven't visited", hint: "'We' usa 'haven't' + particípio ('visited')." },

        // --- NEGATIVOS: PALAVRAS-CHAVE E CONTRASTE COM SIMPLE PAST (20 mc) ---
        { id: 81, type: 'mc', question: "I haven't seen him ___.", options: ["yet", "yesterday", "last week"], correctAnswer: "yet", hint: "'Yet' é típico de frases negativas no Present Perfect." },
        { id: 82, type: 'mc', question: "She hasn't ___ been to Europe.", options: ["ever", "yesterday", "ago"], correctAnswer: "ever", hint: "'Ever' pode aparecer em frases negativas, reforçando a ideia de nunca." },
        { id: 83, type: 'mc', question: "They haven't finished the project ___.", options: ["yet", "yesterday", "ago"], correctAnswer: "yet", hint: "'Yet' confirma o uso do Present Perfect negativo." },
        { id: 84, type: 'mc', question: "We haven't traveled ___ last year.", options: ["since", "for", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de partida no tempo (o ano passado)." },
        { id: 85, type: 'mc', question: "He hasn't called me ___ three days.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica um período de tempo (três dias)." },
        { id: 86, type: 'mc', question: "I ___ (not/see) him yesterday.", options: ["didn't see", "haven't seen", "hasn't seen"], correctAnswer: "didn't see", hint: "'Yesterday' é um tempo específico, use Simple Past negativo." },
        { id: 87, type: 'mc', question: "I ___ (not/see) him yet.", options: ["didn't see", "haven't seen", "hasn't seen"], correctAnswer: "haven't seen", hint: "'Yet' indica Present Perfect negativo." },
        { id: 88, type: 'mc', question: "She ___ (not/finish) her homework last night.", options: ["didn't finish", "haven't finished", "hasn't finished"], correctAnswer: "didn't finish", hint: "'Last night' é um tempo específico, use Simple Past negativo." },
        { id: 89, type: 'mc', question: "She ___ (not/finish) her homework yet.", options: ["didn't finish", "haven't finished", "hasn't finished"], correctAnswer: "hasn't finished", hint: "'Yet' indica Present Perfect negativo; 'she' usa 'hasn't'." },
        { id: 90, type: 'mc', question: "They ___ (not/visit) us last month.", options: ["didn't visit", "haven't visited", "hasn't visited"], correctAnswer: "didn't visit", hint: "'Last month' é um tempo específico, use Simple Past negativo." },
        { id: 91, type: 'mc', question: "They ___ (not/visit) us this year.", options: ["didn't visit", "haven't visited", "hasn't visited"], correctAnswer: "haven't visited", hint: "Sem tempo específico definido no passado, use Present Perfect negativo." },
        { id: 92, type: 'mc', question: "We ___ (not/eat) breakfast this morning.", options: ["didn't eat", "haven't eaten", "hasn't eaten"], correctAnswer: "didn't eat", hint: "'This morning' (já concluída) é tratado como tempo específico, use Simple Past." },
        { id: 93, type: 'mc', question: "We ___ (not/eat) Japanese food before.", options: ["didn't eat", "haven't eaten", "hasn't eaten"], correctAnswer: "haven't eaten", hint: "'Before' sem tempo específico indica experiência, use Present Perfect negativo." },
        { id: 94, type: 'mc', question: "He ___ (not/break) his arm last year.", options: ["didn't break", "haven't broken", "hasn't broken"], correctAnswer: "didn't break", hint: "'Last year' é um tempo específico, use Simple Past negativo." },
        { id: 95, type: 'mc', question: "He ___ (not/break) his arm, so he can play today.", options: ["didn't break", "haven't broken", "hasn't broken"], correctAnswer: "hasn't broken", hint: "Resultado no presente sem tempo específico, use Present Perfect negativo." },
        { id: 96, type: 'mc', question: "I ___ (not/travel) to Europe yet.", options: ["didn't travel", "haven't traveled", "hasn't traveled"], correctAnswer: "haven't traveled", hint: "'Yet' indica Present Perfect; 'I' usa 'haven't'." },
        { id: 97, type: 'mc', question: "I ___ (not/travel) to Europe last year.", options: ["didn't travel", "haven't traveled", "hasn't traveled"], correctAnswer: "didn't travel", hint: "'Last year' é um tempo específico, use Simple Past negativo." },
        { id: 98, type: 'mc', question: "She hasn't lived here ___ long.", options: ["for", "since", "ago"], correctAnswer: "for", hint: "'For' indica um período de tempo." },
        { id: 99, type: 'mc', question: "We haven't spoken ___ that day.", options: ["since", "for", "ago"], correctAnswer: "since", hint: "'Since' indica o ponto de partida no tempo." },
        { id: 100, type: 'mc', question: "They haven't called ___.", options: ["yet", "yesterday", "last week"], correctAnswer: "yet", hint: "'Yet' confirma o Present Perfect negativo." },

        // --- NEGATIVOS: REESCRITA (20 rewrite) ---
        { id: 101, type: 'rewrite', question: "Rewrite in the negative form: I have seen that movie.", correctAnswer: "I haven't seen that movie.", hint: "Use 'haven't' + particípio." },
        { id: 102, type: 'rewrite', question: "Rewrite in the negative form: She has gone to Paris.", correctAnswer: "She hasn't gone to Paris.", hint: "Use 'hasn't' + particípio." },
        { id: 103, type: 'rewrite', question: "Rewrite in the negative form: They have finished their homework.", correctAnswer: "They haven't finished their homework.", hint: "Use 'haven't' + particípio." },
        { id: 104, type: 'rewrite', question: "Rewrite in the negative form: We have lived here since 2010.", correctAnswer: "We haven't lived here since 2010.", hint: "Use 'haven't' + particípio." },
        { id: 105, type: 'rewrite', question: "Rewrite in the negative form: He has eaten sushi before.", correctAnswer: "He hasn't eaten sushi before.", hint: "Use 'hasn't' + particípio." },
        { id: 106, type: 'rewrite', question: "Rewrite in the negative form: You have done a great job.", correctAnswer: "You haven't done a great job.", hint: "Use 'haven't' + particípio." },
        { id: 107, type: 'rewrite', question: "Rewrite in the negative form: I have made many mistakes.", correctAnswer: "I haven't made many mistakes.", hint: "Use 'haven't' + particípio." },
        { id: 108, type: 'rewrite', question: "Rewrite in the negative form: She has written three books.", correctAnswer: "She hasn't written three books.", hint: "Use 'hasn't' + particípio." },
        { id: 109, type: 'rewrite', question: "Rewrite in the negative form: They have come to visit us.", correctAnswer: "They haven't come to visit us.", hint: "Use 'haven't' + particípio." },
        { id: 110, type: 'rewrite', question: "Rewrite in the negative form: We have taken that trip before.", correctAnswer: "We haven't taken that trip before.", hint: "Use 'haven't' + particípio." },
        { id: 111, type: 'rewrite', question: "Rewrite in the negative form: He has given me advice.", correctAnswer: "He hasn't given me advice.", hint: "Use 'hasn't' + particípio." },
        { id: 112, type: 'rewrite', question: "Rewrite in the negative form: I have had many pets.", correctAnswer: "I haven't had many pets.", hint: "Use 'haven't' + particípio." },
        { id: 113, type: 'rewrite', question: "Rewrite in the negative form: She has been to Japan.", correctAnswer: "She hasn't been to Japan.", hint: "Use 'hasn't' + particípio." },
        { id: 114, type: 'rewrite', question: "Rewrite in the negative form: They have tried Thai food.", correctAnswer: "They haven't tried Thai food.", hint: "Use 'haven't' + particípio." },
        { id: 115, type: 'rewrite', question: "Rewrite in the negative form: We have cleaned the house.", correctAnswer: "We haven't cleaned the house.", hint: "Use 'haven't' + particípio." },
        { id: 116, type: 'rewrite', question: "Rewrite in the negative form: He has arrived home.", correctAnswer: "He hasn't arrived home.", hint: "Use 'hasn't' + particípio." },
        { id: 117, type: 'rewrite', question: "Rewrite in the negative form: She has studied for the test.", correctAnswer: "She hasn't studied for the test.", hint: "Use 'hasn't' + particípio." },
        { id: 118, type: 'rewrite', question: "Rewrite in the negative form: They have known each other for years.", correctAnswer: "They haven't known each other for years.", hint: "Use 'haven't' + particípio." },
        { id: 119, type: 'rewrite', question: "Rewrite in the negative form: We have visited that museum.", correctAnswer: "We haven't visited that museum.", hint: "Use 'haven't' + particípio." },
        { id: 120, type: 'rewrite', question: "Rewrite in the negative form: I have finished my report.", correctAnswer: "I haven't finished my report.", hint: "Use 'haven't' + particípio." }
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
