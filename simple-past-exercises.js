document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser || loggedInUser.type !== 'student') {
        alert('Acesso não autorizado. Por favor, faça login como aluno.');
        window.location.href = 'index.html';
        return;
    }

    const TOPIC_NAME = 'Simple Past';

    const exerciseArea = document.getElementById('exercise-area');
    const prevButton = document.getElementById('prev-exercise');
    const nextButton = document.getElementById('next-exercise');

    let currentExerciseIndex = 0;
    let exercises = [];

    // --- EXERCÍCIOS AFIRMATIVOS E NEGATIVOS (120 exemplos) ---
    exercises = [
        // --- AFIRMATIVOS: TO BE (10 mc) ---
        { id: 1, type: 'mc', question: "I ___ (be) tired yesterday.", options: ["am", "was", "were"], correctAnswer: "was", hint: "'I' usa 'was' no passado do verbo 'to be'." },
        { id: 2, type: 'mc', question: "She ___ (be) at home last night.", options: ["was", "were", "is"], correctAnswer: "was", hint: "'She' usa 'was' no passado." },
        { id: 3, type: 'mc', question: "They ___ (be) at the party last Saturday.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'They' usa 'were' no passado." },
        { id: 4, type: 'mc', question: "We ___ (be) students in 2015.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'We' usa 'were' no passado." },
        { id: 5, type: 'mc', question: "He ___ (be) sick last week.", options: ["was", "were", "is"], correctAnswer: "was", hint: "'He' usa 'was' no passado." },
        { id: 6, type: 'mc', question: "You ___ (be) late for the meeting.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'You' usa 'were' no passado." },
        { id: 7, type: 'mc', question: "It ___ (be) cold yesterday.", options: ["was", "were", "is"], correctAnswer: "was", hint: "'It' usa 'was' no passado." },
        { id: 8, type: 'mc', question: "The children ___ (be) happy at the park.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'The children' é plural, use 'were'." },
        { id: 9, type: 'mc', question: "My parents ___ (be) on vacation last month.", options: ["was", "were", "are"], correctAnswer: "were", hint: "'My parents' é plural, use 'were'." },
        { id: 10, type: 'mc', question: "I ___ (be) in London two years ago.", options: ["am", "was", "were"], correctAnswer: "was", hint: "'I' usa 'was' no passado." },

        // --- AFIRMATIVOS: VERBOS REGULARES (10 mc) ---
        { id: 11, type: 'mc', question: "I ___ (walk) to school yesterday.", options: ["walk", "walked", "walking"], correctAnswer: "walked", hint: "Verbos regulares recebem '-ed' no passado." },
        { id: 12, type: 'mc', question: "She ___ (study) for the test last night.", options: ["studyed", "studied", "studies"], correctAnswer: "studied", hint: "Verbos terminados em 'y' precedido de consoante mudam para 'ied'." },
        { id: 13, type: 'mc', question: "They ___ (stop) the car suddenly.", options: ["stoped", "stopped", "stopping"], correctAnswer: "stopped", hint: "Verbos terminados em consoante+vogal+consoante dobram a última letra antes do '-ed'." },
        { id: 14, type: 'mc', question: "We ___ (play) soccer last weekend.", options: ["played", "plaied", "playing"], correctAnswer: "played", hint: "'Play' termina em vogal+y, apenas adicione '-ed'." },
        { id: 15, type: 'mc', question: "He ___ (want) to travel last year.", options: ["wanted", "wantted", "wanting"], correctAnswer: "wanted", hint: "Verbos regulares recebem '-ed' no passado." },
        { id: 16, type: 'mc', question: "You ___ (watch) a movie last night.", options: ["watched", "watchs", "watching"], correctAnswer: "watched", hint: "Verbos regulares recebem '-ed' no passado." },
        { id: 17, type: 'mc', question: "I ___ (live) in Brazil for five years.", options: ["lived", "liveed", "living"], correctAnswer: "lived", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 18, type: 'mc', question: "She ___ (dance) at the party.", options: ["danced", "danceed", "dancing"], correctAnswer: "danced", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 19, type: 'mc', question: "They ___ (arrive) late yesterday.", options: ["arrived", "arriveed", "arriving"], correctAnswer: "arrived", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 20, type: 'mc', question: "We ___ (clean) the house last Saturday.", options: ["cleaned", "cleanned", "cleaning"], correctAnswer: "cleaned", hint: "Verbos regulares recebem '-ed' no passado." },

        // --- AFIRMATIVOS: VERBOS IRREGULARES (10 mc) ---
        { id: 21, type: 'mc', question: "I ___ (go) to the beach last weekend.", options: ["goed", "went", "going"], correctAnswer: "went", hint: "'Go' é um verbo irregular; sua forma no passado é 'went'." },
        { id: 22, type: 'mc', question: "She ___ (see) a movie last night.", options: ["seed", "saw", "seeing"], correctAnswer: "saw", hint: "'See' é irregular; sua forma no passado é 'saw'." },
        { id: 23, type: 'mc', question: "They ___ (have) a party last month.", options: ["haved", "had", "having"], correctAnswer: "had", hint: "'Have' é irregular; sua forma no passado é 'had'." },
        { id: 24, type: 'mc', question: "We ___ (do) our homework yesterday.", options: ["doed", "did", "doing"], correctAnswer: "did", hint: "'Do' é irregular; sua forma no passado é 'did'." },
        { id: 25, type: 'mc', question: "He ___ (make) a cake for the party.", options: ["maked", "made", "making"], correctAnswer: "made", hint: "'Make' é irregular; sua forma no passado é 'made'." },
        { id: 26, type: 'mc', question: "I ___ (eat) pizza last night.", options: ["eated", "ate", "eating"], correctAnswer: "ate", hint: "'Eat' é irregular; sua forma no passado é 'ate'." },
        { id: 27, type: 'mc', question: "She ___ (write) a letter yesterday.", options: ["writed", "wrote", "writing"], correctAnswer: "wrote", hint: "'Write' é irregular; sua forma no passado é 'wrote'." },
        { id: 28, type: 'mc', question: "They ___ (come) to the party late.", options: ["comed", "came", "coming"], correctAnswer: "came", hint: "'Come' é irregular; sua forma no passado é 'came'." },
        { id: 29, type: 'mc', question: "We ___ (take) the bus yesterday.", options: ["taked", "took", "taking"], correctAnswer: "took", hint: "'Take' é irregular; sua forma no passado é 'took'." },
        { id: 30, type: 'mc', question: "He ___ (give) me a gift last year.", options: ["gived", "gave", "giving"], correctAnswer: "gave", hint: "'Give' é irregular; sua forma no passado é 'gave'." },

        // --- AFIRMATIVOS: TO BE (10 rewrite) ---
        { id: 31, type: 'rewrite', question: "Rewrite using the Simple Past: I (be) tired yesterday.", correctAnswer: "I was tired yesterday.", hint: "'I' usa 'was'." },
        { id: 32, type: 'rewrite', question: "Rewrite using the Simple Past: She (be) at home last night.", correctAnswer: "She was at home last night.", hint: "'She' usa 'was'." },
        { id: 33, type: 'rewrite', question: "Rewrite using the Simple Past: They (be) at the party last Saturday.", correctAnswer: "They were at the party last Saturday.", hint: "'They' usa 'were'." },
        { id: 34, type: 'rewrite', question: "Rewrite using the Simple Past: We (be) students in 2015.", correctAnswer: "We were students in 2015.", hint: "'We' usa 'were'." },
        { id: 35, type: 'rewrite', question: "Rewrite using the Simple Past: He (be) sick last week.", correctAnswer: "He was sick last week.", hint: "'He' usa 'was'." },
        { id: 36, type: 'rewrite', question: "Rewrite using the Simple Past: You (be) late for the meeting.", correctAnswer: "You were late for the meeting.", hint: "'You' usa 'were'." },
        { id: 37, type: 'rewrite', question: "Rewrite using the Simple Past: It (be) cold yesterday.", correctAnswer: "It was cold yesterday.", hint: "'It' usa 'was'." },
        { id: 38, type: 'rewrite', question: "Rewrite using the Simple Past: The children (be) happy at the park.", correctAnswer: "The children were happy at the park.", hint: "'The children' é plural, use 'were'." },
        { id: 39, type: 'rewrite', question: "Rewrite using the Simple Past: My parents (be) on vacation last month.", correctAnswer: "My parents were on vacation last month.", hint: "'My parents' é plural, use 'were'." },
        { id: 40, type: 'rewrite', question: "Rewrite using the Simple Past: I (be) in London two years ago.", correctAnswer: "I was in London two years ago.", hint: "'I' usa 'was'." },

        // --- AFIRMATIVOS: VERBOS REGULARES (10 rewrite) ---
        { id: 41, type: 'rewrite', question: "Rewrite using the Simple Past: I (walk) to school yesterday.", correctAnswer: "I walked to school yesterday.", hint: "Adicione '-ed'." },
        { id: 42, type: 'rewrite', question: "Rewrite using the Simple Past: She (study) for the test last night.", correctAnswer: "She studied for the test last night.", hint: "'Y' precedido de consoante muda para 'ied'." },
        { id: 43, type: 'rewrite', question: "Rewrite using the Simple Past: They (stop) the car suddenly.", correctAnswer: "They stopped the car suddenly.", hint: "Dobre a consoante final antes do '-ed'." },
        { id: 44, type: 'rewrite', question: "Rewrite using the Simple Past: We (play) soccer last weekend.", correctAnswer: "We played soccer last weekend.", hint: "Adicione '-ed'." },
        { id: 45, type: 'rewrite', question: "Rewrite using the Simple Past: He (want) to travel last year.", correctAnswer: "He wanted to travel last year.", hint: "Adicione '-ed'." },
        { id: 46, type: 'rewrite', question: "Rewrite using the Simple Past: You (watch) a movie last night.", correctAnswer: "You watched a movie last night.", hint: "Adicione '-ed'." },
        { id: 47, type: 'rewrite', question: "Rewrite using the Simple Past: I (live) in Brazil for five years.", correctAnswer: "I lived in Brazil for five years.", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 48, type: 'rewrite', question: "Rewrite using the Simple Past: She (dance) at the party.", correctAnswer: "She danced at the party.", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 49, type: 'rewrite', question: "Rewrite using the Simple Past: They (arrive) late yesterday.", correctAnswer: "They arrived late yesterday.", hint: "Verbos terminados em 'e' recebem apenas 'd'." },
        { id: 50, type: 'rewrite', question: "Rewrite using the Simple Past: We (clean) the house last Saturday.", correctAnswer: "We cleaned the house last Saturday.", hint: "Adicione '-ed'." },

        // --- AFIRMATIVOS: VERBOS IRREGULARES (10 rewrite) ---
        { id: 51, type: 'rewrite', question: "Rewrite using the Simple Past: I (go) to the beach last weekend.", correctAnswer: "I went to the beach last weekend.", hint: "'Go' vira 'went'." },
        { id: 52, type: 'rewrite', question: "Rewrite using the Simple Past: She (see) a movie last night.", correctAnswer: "She saw a movie last night.", hint: "'See' vira 'saw'." },
        { id: 53, type: 'rewrite', question: "Rewrite using the Simple Past: They (have) a party last month.", correctAnswer: "They had a party last month.", hint: "'Have' vira 'had'." },
        { id: 54, type: 'rewrite', question: "Rewrite using the Simple Past: We (do) our homework yesterday.", correctAnswer: "We did our homework yesterday.", hint: "'Do' vira 'did'." },
        { id: 55, type: 'rewrite', question: "Rewrite using the Simple Past: He (make) a cake for the party.", correctAnswer: "He made a cake for the party.", hint: "'Make' vira 'made'." },
        { id: 56, type: 'rewrite', question: "Rewrite using the Simple Past: I (eat) pizza last night.", correctAnswer: "I ate pizza last night.", hint: "'Eat' vira 'ate'." },
        { id: 57, type: 'rewrite', question: "Rewrite using the Simple Past: She (write) a letter yesterday.", correctAnswer: "She wrote a letter yesterday.", hint: "'Write' vira 'wrote'." },
        { id: 58, type: 'rewrite', question: "Rewrite using the Simple Past: They (come) to the party late.", correctAnswer: "They came to the party late.", hint: "'Come' vira 'came'." },
        { id: 59, type: 'rewrite', question: "Rewrite using the Simple Past: We (take) the bus yesterday.", correctAnswer: "We took the bus yesterday.", hint: "'Take' vira 'took'." },
        { id: 60, type: 'rewrite', question: "Rewrite using the Simple Past: He (give) me a gift last year.", correctAnswer: "He gave me a gift last year.", hint: "'Give' vira 'gave'." },

        // --- NEGATIVOS: TO BE (10 mc) ---
        { id: 61, type: 'mc', question: "I ___ (not/be) tired yesterday.", options: ["wasn't", "didn't be", "weren't"], correctAnswer: "wasn't", hint: "'I' usa 'wasn't' no passado negativo de 'to be'." },
        { id: 62, type: 'mc', question: "She ___ (not/be) at home last night.", options: ["wasn't", "weren't", "didn't be"], correctAnswer: "wasn't", hint: "'She' usa 'wasn't'." },
        { id: 63, type: 'mc', question: "They ___ (not/be) at the party.", options: ["wasn't", "weren't", "didn't be"], correctAnswer: "weren't", hint: "'They' usa 'weren't'." },
        { id: 64, type: 'mc', question: "We ___ (not/be) students in 2015.", options: ["wasn't", "weren't", "didn't be"], correctAnswer: "weren't", hint: "'We' usa 'weren't'." },
        { id: 65, type: 'mc', question: "He ___ (not/be) sick last week.", options: ["wasn't", "weren't", "didn't be"], correctAnswer: "wasn't", hint: "'He' usa 'wasn't'." },
        { id: 66, type: 'mc', question: "You ___ (not/be) late for the meeting.", options: ["wasn't", "weren't", "didn't be"], correctAnswer: "weren't", hint: "'You' usa 'weren't'." },
        { id: 67, type: 'mc', question: "It ___ (not/be) cold yesterday.", options: ["wasn't", "weren't", "didn't be"], correctAnswer: "wasn't", hint: "'It' usa 'wasn't'." },
        { id: 68, type: 'mc', question: "The children ___ (not/be) happy at the park.", options: ["wasn't", "weren't", "didn't be"], correctAnswer: "weren't", hint: "'The children' é plural, use 'weren't'." },
        { id: 69, type: 'mc', question: "My parents ___ (not/be) on vacation.", options: ["wasn't", "weren't", "didn't be"], correctAnswer: "weren't", hint: "'My parents' é plural, use 'weren't'." },
        { id: 70, type: 'mc', question: "I ___ (not/be) in London two years ago.", options: ["wasn't", "weren't", "didn't be"], correctAnswer: "wasn't", hint: "'I' usa 'wasn't'." },

        // --- NEGATIVOS: VERBOS REGULARES (10 mc) ---
        { id: 71, type: 'mc', question: "I ___ (not/walk) to school yesterday.", options: ["didn't walk", "didn't walked", "wasn't walk"], correctAnswer: "didn't walk", hint: "Com 'didn't', o verbo volta para a forma base, sem '-ed'." },
        { id: 72, type: 'mc', question: "She ___ (not/study) for the test.", options: ["didn't study", "didn't studied", "wasn't study"], correctAnswer: "didn't study", hint: "Não use '-ed' depois de 'didn't'." },
        { id: 73, type: 'mc', question: "They ___ (not/stop) the car.", options: ["didn't stop", "didn't stopped", "weren't stop"], correctAnswer: "didn't stop", hint: "Não use '-ed' depois de 'didn't'." },
        { id: 74, type: 'mc', question: "We ___ (not/play) soccer last weekend.", options: ["didn't play", "didn't played", "weren't play"], correctAnswer: "didn't play", hint: "Não use '-ed' depois de 'didn't'." },
        { id: 75, type: 'mc', question: "He ___ (not/want) to travel.", options: ["didn't want", "didn't wanted", "wasn't want"], correctAnswer: "didn't want", hint: "Não use '-ed' depois de 'didn't'." },
        { id: 76, type: 'mc', question: "You ___ (not/watch) a movie last night.", options: ["didn't watch", "didn't watched", "weren't watch"], correctAnswer: "didn't watch", hint: "Não use '-ed' depois de 'didn't'." },
        { id: 77, type: 'mc', question: "I ___ (not/live) in Brazil.", options: ["didn't live", "didn't lived", "wasn't live"], correctAnswer: "didn't live", hint: "Não use '-ed' depois de 'didn't'." },
        { id: 78, type: 'mc', question: "She ___ (not/dance) at the party.", options: ["didn't dance", "didn't danced", "wasn't dance"], correctAnswer: "didn't dance", hint: "Não use '-ed' depois de 'didn't'." },
        { id: 79, type: 'mc', question: "They ___ (not/arrive) late.", options: ["didn't arrive", "didn't arrived", "weren't arrive"], correctAnswer: "didn't arrive", hint: "Não use '-ed' depois de 'didn't'." },
        { id: 80, type: 'mc', question: "We ___ (not/clean) the house.", options: ["didn't clean", "didn't cleaned", "weren't clean"], correctAnswer: "didn't clean", hint: "Não use '-ed' depois de 'didn't'." },

        // --- NEGATIVOS: VERBOS IRREGULARES (10 mc) ---
        { id: 81, type: 'mc', question: "I ___ (not/go) to the beach.", options: ["didn't go", "didn't went", "wasn't go"], correctAnswer: "didn't go", hint: "Com 'didn't', o verbo volta para a forma base ('go'), não 'went'." },
        { id: 82, type: 'mc', question: "She ___ (not/see) a movie.", options: ["didn't see", "didn't saw", "wasn't see"], correctAnswer: "didn't see", hint: "Use a forma base 'see', não 'saw'." },
        { id: 83, type: 'mc', question: "They ___ (not/have) a party.", options: ["didn't have", "didn't had", "weren't have"], correctAnswer: "didn't have", hint: "Use a forma base 'have', não 'had'." },
        { id: 84, type: 'mc', question: "We ___ (not/do) our homework.", options: ["didn't do", "didn't did", "weren't do"], correctAnswer: "didn't do", hint: "Use a forma base 'do', não 'did'." },
        { id: 85, type: 'mc', question: "He ___ (not/make) a cake.", options: ["didn't make", "didn't made", "wasn't make"], correctAnswer: "didn't make", hint: "Use a forma base 'make', não 'made'." },
        { id: 86, type: 'mc', question: "I ___ (not/eat) pizza.", options: ["didn't eat", "didn't ate", "wasn't eat"], correctAnswer: "didn't eat", hint: "Use a forma base 'eat', não 'ate'." },
        { id: 87, type: 'mc', question: "She ___ (not/write) a letter.", options: ["didn't write", "didn't wrote", "wasn't write"], correctAnswer: "didn't write", hint: "Use a forma base 'write', não 'wrote'." },
        { id: 88, type: 'mc', question: "They ___ (not/come) to the party.", options: ["didn't come", "didn't came", "weren't come"], correctAnswer: "didn't come", hint: "Use a forma base 'come', não 'came'." },
        { id: 89, type: 'mc', question: "We ___ (not/take) the bus.", options: ["didn't take", "didn't took", "weren't take"], correctAnswer: "didn't take", hint: "Use a forma base 'take', não 'took'." },
        { id: 90, type: 'mc', question: "He ___ (not/give) me a gift.", options: ["didn't give", "didn't gave", "wasn't give"], correctAnswer: "didn't give", hint: "Use a forma base 'give', não 'gave'." },

        // --- NEGATIVOS: TO BE (10 rewrite) ---
        { id: 91, type: 'rewrite', question: "Rewrite in the negative form: I was tired yesterday.", correctAnswer: "I wasn't tired yesterday.", hint: "Use 'wasn't' para 'I'." },
        { id: 92, type: 'rewrite', question: "Rewrite in the negative form: She was at home last night.", correctAnswer: "She wasn't at home last night.", hint: "Use 'wasn't' para 'she'." },
        { id: 93, type: 'rewrite', question: "Rewrite in the negative form: They were at the party.", correctAnswer: "They weren't at the party.", hint: "Use 'weren't' para 'they'." },
        { id: 94, type: 'rewrite', question: "Rewrite in the negative form: We were students in 2015.", correctAnswer: "We weren't students in 2015.", hint: "Use 'weren't' para 'we'." },
        { id: 95, type: 'rewrite', question: "Rewrite in the negative form: He was sick last week.", correctAnswer: "He wasn't sick last week.", hint: "Use 'wasn't' para 'he'." },
        { id: 96, type: 'rewrite', question: "Rewrite in the negative form: You were late for the meeting.", correctAnswer: "You weren't late for the meeting.", hint: "Use 'weren't' para 'you'." },
        { id: 97, type: 'rewrite', question: "Rewrite in the negative form: It was cold yesterday.", correctAnswer: "It wasn't cold yesterday.", hint: "Use 'wasn't' para 'it'." },
        { id: 98, type: 'rewrite', question: "Rewrite in the negative form: The children were happy at the park.", correctAnswer: "The children weren't happy at the park.", hint: "Use 'weren't' para 'the children'." },
        { id: 99, type: 'rewrite', question: "Rewrite in the negative form: My parents were on vacation.", correctAnswer: "My parents weren't on vacation.", hint: "Use 'weren't' para 'my parents'." },
        { id: 100, type: 'rewrite', question: "Rewrite in the negative form: I was in London two years ago.", correctAnswer: "I wasn't in London two years ago.", hint: "Use 'wasn't' para 'I'." },

        // --- NEGATIVOS: VERBOS REGULARES (10 rewrite) ---
        { id: 101, type: 'rewrite', question: "Rewrite in the negative form: I walked to school yesterday.", correctAnswer: "I didn't walk to school yesterday.", hint: "Use 'didn't' + verbo na forma base." },
        { id: 102, type: 'rewrite', question: "Rewrite in the negative form: She studied for the test.", correctAnswer: "She didn't study for the test.", hint: "Use 'didn't' + verbo na forma base." },
        { id: 103, type: 'rewrite', question: "Rewrite in the negative form: They stopped the car.", correctAnswer: "They didn't stop the car.", hint: "Use 'didn't' + verbo na forma base." },
        { id: 104, type: 'rewrite', question: "Rewrite in the negative form: We played soccer last weekend.", correctAnswer: "We didn't play soccer last weekend.", hint: "Use 'didn't' + verbo na forma base." },
        { id: 105, type: 'rewrite', question: "Rewrite in the negative form: He wanted to travel.", correctAnswer: "He didn't want to travel.", hint: "Use 'didn't' + verbo na forma base." },
        { id: 106, type: 'rewrite', question: "Rewrite in the negative form: You watched a movie last night.", correctAnswer: "You didn't watch a movie last night.", hint: "Use 'didn't' + verbo na forma base." },
        { id: 107, type: 'rewrite', question: "Rewrite in the negative form: I lived in Brazil.", correctAnswer: "I didn't live in Brazil.", hint: "Use 'didn't' + verbo na forma base." },
        { id: 108, type: 'rewrite', question: "Rewrite in the negative form: She danced at the party.", correctAnswer: "She didn't dance at the party.", hint: "Use 'didn't' + verbo na forma base." },
        { id: 109, type: 'rewrite', question: "Rewrite in the negative form: They arrived late.", correctAnswer: "They didn't arrive late.", hint: "Use 'didn't' + verbo na forma base." },
        { id: 110, type: 'rewrite', question: "Rewrite in the negative form: We cleaned the house.", correctAnswer: "We didn't clean the house.", hint: "Use 'didn't' + verbo na forma base." },

        // --- NEGATIVOS: VERBOS IRREGULARES (10 rewrite) ---
        { id: 111, type: 'rewrite', question: "Rewrite in the negative form: I went to the beach.", correctAnswer: "I didn't go to the beach.", hint: "Use 'didn't' + a forma base 'go', não 'went'." },
        { id: 112, type: 'rewrite', question: "Rewrite in the negative form: She saw a movie.", correctAnswer: "She didn't see a movie.", hint: "Use 'didn't' + a forma base 'see', não 'saw'." },
        { id: 113, type: 'rewrite', question: "Rewrite in the negative form: They had a party.", correctAnswer: "They didn't have a party.", hint: "Use 'didn't' + a forma base 'have', não 'had'." },
        { id: 114, type: 'rewrite', question: "Rewrite in the negative form: We did our homework.", correctAnswer: "We didn't do our homework.", hint: "Use 'didn't' + a forma base 'do', não 'did'." },
        { id: 115, type: 'rewrite', question: "Rewrite in the negative form: He made a cake.", correctAnswer: "He didn't make a cake.", hint: "Use 'didn't' + a forma base 'make', não 'made'." },
        { id: 116, type: 'rewrite', question: "Rewrite in the negative form: I ate pizza.", correctAnswer: "I didn't eat pizza.", hint: "Use 'didn't' + a forma base 'eat', não 'ate'." },
        { id: 117, type: 'rewrite', question: "Rewrite in the negative form: She wrote a letter.", correctAnswer: "She didn't write a letter.", hint: "Use 'didn't' + a forma base 'write', não 'wrote'." },
        { id: 118, type: 'rewrite', question: "Rewrite in the negative form: They came to the party.", correctAnswer: "They didn't come to the party.", hint: "Use 'didn't' + a forma base 'come', não 'came'." },
        { id: 119, type: 'rewrite', question: "Rewrite in the negative form: We took the bus.", correctAnswer: "We didn't take the bus.", hint: "Use 'didn't' + a forma base 'take', não 'took'." },
        { id: 120, type: 'rewrite', question: "Rewrite in the negative form: He gave me a gift.", correctAnswer: "He didn't give me a gift.", hint: "Use 'didn't' + a forma base 'give', não 'gave'." }
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
