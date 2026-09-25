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
        { id: 37, type: 'mc', question: "She has ___ finished the book.", options: ["already", "yesterday", "last week"], correctAnswer: "already", hint: "'Already

