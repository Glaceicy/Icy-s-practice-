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
    }
  }
} as const;
