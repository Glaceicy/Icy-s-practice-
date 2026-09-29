/** UI translation dictionary. Keys are dot-paths grouped by feature/page —
 * looked up via `translate()` (Server Components: import it directly with
 * `getLocale()`; Client Components: `useT()` from I18nProvider). Every key
 * must exist in `en`; `fr` is filled in incrementally as pages are
 * translated — a missing `fr` key silently falls back to English rather than
 * breaking the page (see translate.ts). */
export const dictionary = {
  en: {
    home: {
      title: "Maths Journey UK",
      tagline:
        "A progressive mathematics learning journey for Years 1–10, aligned to the National Curriculum for England. Short lessons, guided practice and a 95% Mastery Challenge unlock every new level — built for children, loved by parents and teachers.",
      continueToProfiles: "Continue to profiles",
      createAccount: "Create a free adult account",
      signIn: "Sign in",
      featureYearsTitle: "Years 1–10",
      featureYearsBody: "100 progressive levels across Key Stages 1–4, including GCSE-style Foundation and Higher pathways in Year 10.",
      featureLearningTitle: "Built for real learning",
      featureLearningBody: "Short concrete-pictorial-abstract lessons, guided and independent practice, and a 40-question Mastery Challenge to unlock every level.",
      featureSafeTitle: "Safe by design",
      featureSafeBody: "No adverts, no public profiles, no child-to-child messaging. Children use an avatar and a 4-digit PIN — never an email address.",
      contentCoverage:
        "Content coverage: Year 1 Levels 1, 2 and 10, plus Year 4 Level 1, Year 7 Level 1 and Year 10 Level 1 are fully built with validated lessons and question banks today. Every other level has its full curriculum structure in place and is clearly marked “Coming soon” while its content is authored using the same engine."
    },
    login: {
      title: "Sign in",
      subtitle: "Sign in to your parent or teacher account.",
      emailLabel: "Email address",
      passwordLabel: "Password",
      submit: "Sign in",
      submitting: "Signing in...",
      demoAccountLabel: "Demo account:",
      newHere: "New here?",
      createAccountLink: "Create an account"
    },
    register: {
      title: "Create your adult account",
      subtitle:
        "Parents, carers and teachers use this account to create and manage child/learner profiles. Children never need their own email address — they sign in with an avatar and a 4-digit PIN.",
      fullNameLabel: "Your full name",
      emailLabel: "Email address",
      passwordLabel: "Password (at least 10 characters)",
      roleLegend: "I am a...",
      roleParent: "Parent or carer",
      roleTeacher: "Teacher",
      consentText:
        "I confirm I am an adult (18+) and I am creating and managing this account, plus any child profiles under it, with parental or teacher responsibility for the children involved.",
      submit: "Create account",
      submitting: "Creating your account...",
      alreadyHaveAccount: "Already have an account?",
      signInLink: "Sign in"
    },
    profiles: {
      heading: "Who's learning today?",
      signedInAs: "Signed in as {name} ({role})",
      dashboard: "Dashboard",
      admin: "Admin",
      signOut: "Sign out",
      addChildProfile: "Add a child profile"
    },
    newProfile: {
      title: "Create a child profile",
      subtitle: "You can select the school year to start in. Progress through the 10 levels within a year is always sequential.",
      nameLabel: "Child's first name (or nickname)",
      chooseAvatar: "Choose an avatar",
      startingYearLabel: "Starting school year",
      startingYearHelp: "Your child will start at Level 1 of this year and progress sequentially — they cannot skip ahead of a locked level.",
      pathwayLabel: "Year 10 pathway (only applies once your child reaches Year 10)",
      pathwayCore: "Core",
      pathwayFoundation: "Foundation (GCSE)",
      pathwayHigher: "Higher (GCSE)",
      pinLabel: "4-digit PIN",
      pinConfirmLabel: "Confirm PIN",
      pinHelp: "Your child will use their avatar and this PIN to sign in — no email address needed.",
      submit: "Create profile",
      submitting: "Creating profile..."
    },
    profilePinCard: {
      enterPin: "Enter PIN",
      pinLabelFor: "4-digit PIN for {name}",
      go: "Go!",
      checking: "Checking..."
    },
    childTopBar: {
      journeyMap: "Journey map",
      allYears: "All years",
      achievements: "🏆 Achievements",
      settings: "⚙️ Settings",
      parentDashboard: "Parent dashboard",
      switchProfile: "Switch profile"
    },
    journeyYear: {
      heading: "{year} learning journey",
      mixedMastery: "Mixed mastery",
      passed: "Passed",
      lockedHint: "Score 95% or more in the previous level to unlock this level.",
      comingSoon: "Content coming soon — this level's lessons and questions are still being written.",
      bestScore: "Best score: {score}%"
    },
    yearSelect: {
      title: "School years",
      currentlyLearning: "{name} is currently learning in {year}. Progress through each year's 10 levels is always in order — a year only shows levels once at least one has been unlocked.",
      levelsPassed: "{count} / 10 levels passed",
      lockedHint: "Locked — complete the previous year first"
    },
    levelOverview: {
      lockedTitle: "This level is still locked",
      lockedBody: "Score 95% or more in the previous level to unlock this level.",
      backToJourney: "Back to the journey map",
      comingSoonTitle: "Coming soon",
      comingSoonBody: "{level} is unlocked, but its lessons and questions are still being written. Please check back soon — in the meantime, explore an available level from the journey map.",
      whatYouWillLearn: "What you will learn",
      objectivePrefix: "By the end of this level, you will be able to {objective}",
      lessonsTitle: "Lessons",
      lessonsBody: "{count} short lessons explaining each idea, with worked examples.",
      guidedTitle: "Guided practice",
      guidedBody: "10 questions with hints available if you need them.",
      independentTitle: "Independent practice",
      independentBody: "At least 20 questions that adapt to how you're doing.",
      masteryTitle: "Mastery Challenge",
      masteryBody: "40 questions in 4 rounds. Score 38/40 (95%) to unlock the next level.",
      previousAttemptsTitle: "Your previous Mastery Challenge attempts",
      attemptLabel: "Attempt {number}",
      passedSuffix: "— Passed"
    },
    practiceSession: {
      loading: "Loading your next question…",
      allDone: "All done! Taking you to the next step…",
      questionOf: "Question {position} of {total}",
      remaining: "{count} remaining",
      wellDone: "🎉 Well done!",
      getHint: "💡 Get a hint",
      genericHint: "Take it one step at a time — think about what the question is really asking.",
      tryAgain: "Try a similar question"
    },
    masterySession: {
      loading: "Loading your Mastery Challenge…",
      progressSavedTitle: "Progress saved",
      progressSavedBody: "You've answered {answered} of {total} questions. Come back any time — nothing will be lost.",
      continueChallenge: "Continue the challenge",
      roundComplete: "Round {round} complete!",
      questionsRemaining: "{count} question(s) remaining in this Mastery Challenge.",
      takeABreak: "Feel free to take a short movement or rest break before continuing.",
      startRound: "Start round {round}",
      continueLabel: "Continue",
      saveAndBreak: "Save and take a break",
      allAnsweredTitle: "All 40 questions answered",
      allAnsweredBody: "Once you submit, your answers are final and your score will be calculated.",
      submitting: "Submitting...",
      submitChallenge: "Submit my Mastery Challenge",
      roundOf: "Round {round} of 4 · Question {position} of 10",
      remainingOverall: "{count} remaining overall",
      continueNext: "Continue to the next question",
      pauseAndSave: "Pause and save progress",
      genericError: "Something went wrong. Please try again."
    },
    questionInput: {
      chooseAnswer: "Choose an answer",
      orderingHelp: "Tap the items in order (or use the number buttons for a keyboard/accessible alternative to dragging).",
      resetOrder: "Reset order",
      chooseMatch: "Choose a match…",
      yourAnswer: "Your answer",
      submitAnswer: "Submit answer"
    },
    wrongAnswerCard: {
      misconceptionIntro: "It looks like this might be about:",
      stepByStep: "Let's look at it step by step:",
      hintLabel: "Hint:",
      scaffoldEasier: "Let's try a couple of easier questions first, then come back to this one."
    },
    wrongAnswerReviewPanel: {
      defaultTrigger: "📋 Review my tricky questions",
      dialogLabel: "Questions to review",
      close: "Close",
      loading: "Loading…",
      questionsToReviewOne: "{count} question to look back on",
      questionsToReviewMany: "{count} questions to look back on",
      fetching: "Fetching your questions…",
      nothingToReview: "Nothing to review yet — great work so far!",
      youAnswered: "You answered:",
      correctAnswer: "Correct answer:"
    },
    scratchpad: {
      trigger: "✏️ Scratchpad",
      title: "Scratchpad",
      close: "Close",
      penColour: "Pen colour",
      undo: "↩️ Undo",
      clear: "🧹 Clear",
      footer: "Draw here to work things out — this is just for you, it isn't submitted as your answer."
    },
    guidedPage: {
      heading: "Guided practice: {level}",
      subtitle: "Ask for a hint any time you need one. If an answer isn't quite right, we'll work through it together."
    },
    independentPage: {
      heading: "Independent practice: {level}",
      subtitle: "Have a go on your own. When you're ready, the Mastery Challenge is next."
    },
    revisionPage: {
      heading: "Personalised revision: {level}",
      subtitle: "You're nearly there! Let's practise these skills before trying the challenge again."
    },
    masteryPage: {
      heading: "Mastery Challenge: {level}",
      subtitle: "40 questions in 4 rounds of 10. Score 38 or more (95%) to unlock the next level. You can pause after any round and continue later."
    },
    reviewTricky: {
      triggerOne: "📋 Review {count} tricky question",
      triggerMany: "📋 Review {count} tricky questions",
      lookBackTitle: "Want to look back at the tricky ones?",
      lookBackBodyPractice: "See every question you found tricky, with the correct answer and explanation.",
      lookBackBodyMastery: "See every question you missed, with the correct answer and explanation."
    },
    practiceSummary: {
      modeGuided: "Guided practice",
      modeRevision: "Personalised revision",
      modeIndependent: "Independent practice",
      complete: "{mode} complete!",
      questionsCorrect: "questions answered correctly",
      startIndependent: "Start independent practice",
      takeMastery: "Take the Mastery Challenge",
      tryMasteryAgain: "Try the Mastery Challenge again",
      backToLevel: "Back to level overview"
    },
    masteryResults: {
      passedTitle: "Fantastic! You passed!",
      notPassedTitle: "You're nearly there!",
      unlockedNext: "🔓 Year {year} Level {level} is now unlocked!",
      programmeComplete: "🎉 You've completed the whole Maths Journey programme!",
      tryAgainEncouragement: "You're nearly there! Let's practise these skills before trying the challenge again.",
      passRequirement: "You need {needed} out of {total} (95%) to pass and unlock the next level.",
      skillsToPractise: "Skills to keep practising",
      missedCount: "{count} missed",
      startRevision: "Start personalised revision",
      backToLevel: "Back to level overview",
      continueJourney: "Continue your journey"
    }
  },
  fr: {
    home: {
      title: "Maths Journey UK",
      tagline:
        "Un parcours progressif d’apprentissage des mathématiques pour les années 1 à 10, aligné sur le programme national pour l’Angleterre. Des leçons courtes, un entraînement guidé et un Défi de Maîtrise à 95 % débloquent chaque nouveau niveau — conçu pour les enfants, apprécié des parents et des enseignants.",
      continueToProfiles: "Continuer vers les profils",
      createAccount: "Créer un compte adulte gratuit",
      signIn: "Se connecter",
      featureYearsTitle: "Années 1 à 10",
      featureYearsBody: "100 niveaux progressifs couvrant les Key Stages 1 à 4, avec des parcours de type GCSE Foundation et Higher en année 10.",
      featureLearningTitle: "Conçu pour un vrai apprentissage",
      featureLearningBody: "Des leçons courtes concret-imagé-abstrait, un entraînement guidé et autonome, et un Défi de Maîtrise de 40 questions pour débloquer chaque niveau.",
      featureSafeTitle: "Sécurisé par conception",
      featureSafeBody: "Pas de publicités, pas de profils publics, pas de messagerie entre enfants. Les enfants utilisent un avatar et un code à 4 chiffres — jamais d’adresse e-mail.",
      contentCoverage:
        "Contenu disponible : les niveaux 1, 2 et 10 de l’année 1, ainsi que le niveau 1 des années 4, 7 et 10 sont entièrement disponibles avec leçons et banques de questions validées. Chaque autre niveau a déjà sa structure de programme en place et est clairement marqué « Bientôt disponible » pendant que son contenu est rédigé avec le même moteur."
    },
    login: {
      title: "Se connecter",
      subtitle: "Connectez-vous à votre compte parent ou enseignant.",
      emailLabel: "Adresse e-mail",
      passwordLabel: "Mot de passe",
      submit: "Se connecter",
      submitting: "Connexion en cours...",
      demoAccountLabel: "Compte de démonstration :",
      newHere: "Nouveau ici ?",
      createAccountLink: "Créer un compte"
    },
    register: {
      title: "Créez votre compte adulte",
      subtitle:
        "Les parents, tuteurs et enseignants utilisent ce compte pour créer et gérer les profils des enfants/apprenants. Les enfants n’ont jamais besoin de leur propre adresse e-mail — ils se connectent avec un avatar et un code à 4 chiffres.",
      fullNameLabel: "Votre nom complet",
      emailLabel: "Adresse e-mail",
      passwordLabel: "Mot de passe (au moins 10 caractères)",
      roleLegend: "Je suis...",
      roleParent: "Parent ou tuteur",
      roleTeacher: "Enseignant(e)",
      consentText:
        "Je confirme être un adulte (18 ans ou plus) et créer et gérer ce compte, ainsi que tout profil d’enfant qui y est rattaché, avec une responsabilité parentale ou enseignante envers les enfants concernés.",
      submit: "Créer le compte",
      submitting: "Création de votre compte...",
      alreadyHaveAccount: "Vous avez déjà un compte ?",
      signInLink: "Se connecter"
    },
    profiles: {
      heading: "Qui apprend aujourd’hui ?",
      signedInAs: "Connecté en tant que {name} ({role})",
      dashboard: "Tableau de bord",
      admin: "Admin",
      signOut: "Se déconnecter",
      addChildProfile: "Ajouter un profil enfant"
    },
    newProfile: {
      title: "Créer un profil enfant",
      subtitle: "Vous pouvez choisir l’année scolaire de départ. La progression dans les 10 niveaux d’une année est toujours séquentielle.",
      nameLabel: "Prénom (ou surnom) de l’enfant",
      chooseAvatar: "Choisir un avatar",
      startingYearLabel: "Année scolaire de départ",
      startingYearHelp: "Votre enfant commencera au niveau 1 de cette année et progressera séquentiellement — il ne peut pas passer devant un niveau verrouillé.",
      pathwayLabel: "Parcours de l’année 10 (s’applique uniquement lorsque votre enfant atteint l’année 10)",
      pathwayCore: "Tronc commun",
      pathwayFoundation: "Foundation (GCSE)",
      pathwayHigher: "Higher (GCSE)",
      pinLabel: "Code à 4 chiffres",
      pinConfirmLabel: "Confirmer le code",
      pinHelp: "Votre enfant utilisera son avatar et ce code pour se connecter — aucune adresse e-mail n’est nécessaire.",
      submit: "Créer le profil",
      submitting: "Création du profil..."
    },
    profilePinCard: {
      enterPin: "Entrer le code",
      pinLabelFor: "Code à 4 chiffres pour {name}",
      go: "C’est parti !",
      checking: "Vérification..."
    },
    childTopBar: {
      journeyMap: "Carte du parcours",
      allYears: "Toutes les années",
      achievements: "🏆 Récompenses",
      settings: "⚙️ Paramètres",
      parentDashboard: "Tableau de bord parent",
      switchProfile: "Changer de profil"
    },
    journeyYear: {
      heading: "Parcours d’apprentissage — {year}",
      mixedMastery: "Maîtrise mixte",
      passed: "Réussi",
      lockedHint: "Obtenez 95 % ou plus au niveau précédent pour débloquer ce niveau.",
      comingSoon: "Contenu bientôt disponible — les leçons et questions de ce niveau sont encore en cours de rédaction.",
      bestScore: "Meilleur score : {score} %"
    },
    yearSelect: {
      title: "Années scolaires",
      currentlyLearning: "{name} apprend actuellement en {year}. La progression dans les 10 niveaux de chaque année se fait toujours dans l’ordre — une année n’affiche ses niveaux qu’une fois qu’au moins un a été débloqué.",
      levelsPassed: "{count} / 10 niveaux réussis",
      lockedHint: "Verrouillé — terminez d’abord l’année précédente"
    },
    levelOverview: {
      lockedTitle: "Ce niveau est encore verrouillé",
      lockedBody: "Obtenez 95 % ou plus au niveau précédent pour débloquer ce niveau.",
      backToJourney: "Retour à la carte du parcours",
      comingSoonTitle: "Bientôt disponible",
      comingSoonBody: "{level} est débloqué, mais ses leçons et questions sont encore en cours de rédaction. Revenez bientôt — en attendant, explorez un niveau disponible depuis la carte du parcours.",
      whatYouWillLearn: "Ce que vous allez apprendre",
      objectivePrefix: "D’ici la fin de ce niveau, vous serez capable de {objective}",
      lessonsTitle: "Leçons",
      lessonsBody: "{count} courtes leçons expliquant chaque idée, avec des exemples résolus.",
      guidedTitle: "Entraînement guidé",
      guidedBody: "10 questions avec des indices disponibles si besoin.",
      independentTitle: "Entraînement autonome",
      independentBody: "Au moins 20 questions qui s’adaptent à vos progrès.",
      masteryTitle: "Défi de Maîtrise",
      masteryBody: "40 questions en 4 manches. Obtenez 38/40 (95 %) pour débloquer le niveau suivant.",
      previousAttemptsTitle: "Vos précédentes tentatives du Défi de Maîtrise",
      attemptLabel: "Tentative {number}",
      passedSuffix: "— Réussi"
    },
    practiceSession: {
      loading: "Chargement de votre prochaine question…",
      allDone: "Terminé ! On vous emmène vers l’étape suivante…",
      questionOf: "Question {position} sur {total}",
      remaining: "{count} restante(s)",
      wellDone: "🎉 Bien joué !",
      getHint: "💡 Obtenir un indice",
      genericHint: "Allez-y étape par étape — réfléchissez à ce que la question demande vraiment.",
      tryAgain: "Essayer une question similaire"
    },
    masterySession: {
      loading: "Chargement de votre Défi de Maîtrise…",
      progressSavedTitle: "Progression enregistrée",
      progressSavedBody: "Vous avez répondu à {answered} question(s) sur {total}. Revenez quand vous voulez — rien ne sera perdu.",
      continueChallenge: "Continuer le défi",
      roundComplete: "Manche {round} terminée !",
      questionsRemaining: "{count} question(s) restante(s) dans ce Défi de Maîtrise.",
      takeABreak: "N’hésitez pas à faire une courte pause avant de continuer.",
      startRound: "Commencer la manche {round}",
      continueLabel: "Continuer",
      saveAndBreak: "Enregistrer et faire une pause",
      allAnsweredTitle: "Les 40 questions ont été répondues",
      allAnsweredBody: "Une fois soumises, vos réponses sont définitives et votre score sera calculé.",
      submitting: "Envoi en cours...",
      submitChallenge: "Soumettre mon Défi de Maîtrise",
      roundOf: "Manche {round} sur 4 · Question {position} sur 10",
      remainingOverall: "{count} restante(s) au total",
      continueNext: "Passer à la question suivante",
      pauseAndSave: "Mettre en pause et enregistrer",
      genericError: "Une erreur s’est produite. Veuillez réessayer."
    },
    questionInput: {
      chooseAnswer: "Choisissez une réponse",
      orderingHelp: "Appuyez sur les éléments dans l’ordre (ou utilisez les boutons numérotés comme alternative accessible au glisser-déposer).",
      resetOrder: "Réinitialiser l’ordre",
      chooseMatch: "Choisir une correspondance…",
      yourAnswer: "Votre réponse",
      submitAnswer: "Valider la réponse"
    },
    wrongAnswerCard: {
      misconceptionIntro: "Cela pourrait concerner :",
      stepByStep: "Regardons cela étape par étape :",
      hintLabel: "Indice :",
      scaffoldEasier: "Essayons d’abord deux questions plus faciles, puis revenons à celle-ci."
    },
    wrongAnswerReviewPanel: {
      defaultTrigger: "📋 Revoir mes questions difficiles",
      dialogLabel: "Questions à revoir",
      close: "Fermer",
      loading: "Chargement…",
      questionsToReviewOne: "{count} question à revoir",
      questionsToReviewMany: "{count} questions à revoir",
      fetching: "Récupération de vos questions…",
      nothingToReview: "Rien à revoir pour l’instant — excellent travail !",
      youAnswered: "Vous avez répondu :",
      correctAnswer: "Bonne réponse :"
    },
    scratchpad: {
      trigger: "✏️ Brouillon",
      title: "Brouillon",
      close: "Fermer",
      penColour: "Couleur du stylo",
      undo: "↩️ Annuler",
      clear: "🧹 Effacer",
      footer: "Dessinez ici pour réfléchir — c’est juste pour vous, ce n’est pas envoyé comme réponse."
    },
    guidedPage: {
      heading: "Entraînement guidé : {level}",
      subtitle: "Demandez un indice quand vous en avez besoin. Si une réponse n’est pas tout à fait juste, nous la reverrons ensemble."
    },
    independentPage: {
      heading: "Entraînement autonome : {level}",
      subtitle: "Essayez par vous-même. Une fois prêt, le Défi de Maîtrise vous attend."
    },
    revisionPage: {
      heading: "Révision personnalisée : {level}",
      subtitle: "Vous y êtes presque ! Entraînons ces compétences avant de retenter le défi."
    },
    masteryPage: {
      heading: "Défi de Maîtrise : {level}",
      subtitle: "40 questions en 4 manches de 10. Obtenez 38 ou plus (95 %) pour débloquer le niveau suivant. Vous pouvez faire une pause après chaque manche et continuer plus tard."
    },
    reviewTricky: {
      triggerOne: "📋 Revoir {count} question difficile",
      triggerMany: "📋 Revoir {count} questions difficiles",
      lookBackTitle: "Envie de revoir les questions difficiles ?",
      lookBackBodyPractice: "Revoyez chaque question que vous avez trouvée difficile, avec la bonne réponse et l’explication.",
      lookBackBodyMastery: "Revoyez chaque question manquée, avec la bonne réponse et l’explication."
    },
    practiceSummary: {
      modeGuided: "Entraînement guidé",
      modeRevision: "Révision personnalisée",
      modeIndependent: "Entraînement autonome",
      complete: "{mode} terminé !",
      questionsCorrect: "questions répondues correctement",
      startIndependent: "Commencer l’entraînement autonome",
      takeMastery: "Passer au Défi de Maîtrise",
      tryMasteryAgain: "Retenter le Défi de Maîtrise",
      backToLevel: "Retour à l’aperçu du niveau"
    },
    masteryResults: {
      passedTitle: "Fantastique, vous avez réussi !",
      notPassedTitle: "Vous y êtes presque !",
      unlockedNext: "🔓 Année {year} Niveau {level} est maintenant débloqué !",
      programmeComplete: "🎉 Vous avez terminé tout le programme Maths Journey !",
      tryAgainEncouragement: "Vous y êtes presque ! Entraînons ces compétences avant de retenter le défi.",
      passRequirement: "Il vous faut {needed} sur {total} (95 %) pour réussir et débloquer le niveau suivant.",
      skillsToPractise: "Compétences à continuer de travailler",
      missedCount: "{count} manquée(s)",
      startRevision: "Commencer la révision personnalisée",
      backToLevel: "Retour à l’aperçu du niveau",
      continueJourney: "Continuer votre parcours"
    }
  }
} as const;
