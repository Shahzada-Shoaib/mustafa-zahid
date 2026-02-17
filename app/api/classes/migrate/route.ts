import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Class from '@/lib/models/Class';

// Migration data extracted from existing hardcoded pages
const migrationData = [
  {
    slug: 'guitar-classes-in-lahore',
    title: 'Guitar Classes in Lahore',
    type: 'studio',
    instrument: 'guitar',
    hero: {
      badge: 'Professional Guitar Training',
      title: 'Master the Art of',
      titleHighlight: 'Guitar',
      description: 'Learn from expert instructors in a structured, professional environment. Whether you\'re a complete beginner or looking to advance your skills, our comprehensive curriculum will guide you every step of the way.',
      heroImage: '/guitarCloud.png',
    },
    features: [
      { icon: 'GuitarIcon', title: 'Acoustic & Electric', description: 'Comprehensive training covering both acoustic and electric guitar techniques, from fingerstyle to lead guitar.' },
      { icon: 'BookIcon', title: 'Structured Curriculum', description: 'Progressive learning path designed by professional musicians, ensuring solid foundation at every level.' },
      { icon: 'TargetIcon', title: 'Personalized Instruction', description: 'Individual attention tailored to your learning style, pace, and musical goals for maximum progress.' },
      { icon: 'MusicIcon', title: 'Complete Music Theory', description: 'Master music theory, chord construction, scales, and rhythm patterns alongside practical playing skills.' },
    ],
    curriculum: [
      { text: 'Proper guitar posture, hand positioning, and finger placement techniques' },
      { text: 'Fundamental chord shapes, progressions, and strumming patterns' },
      { text: 'Advanced fingerpicking, arpeggios, and classical techniques' },
      { text: 'Music theory fundamentals: scales, intervals, and harmony' },
      { text: 'Reading guitar tabs and standard musical notation' },
      { text: 'Learning popular songs across different genres' },
      { text: 'Improvisation techniques and solo playing' },
      { text: 'Performance skills and stage presence' },
      { text: 'Guitar maintenance and care' },
      { text: 'Recording techniques and studio basics' },
    ],
    learningPaths: [
      {
        stage: 'Beginner',
        duration: 'Months 1-3',
        description: 'Build a solid foundation with proper technique, basic chords, and simple songs.',
        skills: ['Basic chords (C, G, D, E, A)', 'Simple strumming patterns', 'Reading guitar tabs', 'Proper posture and technique'],
      },
      {
        stage: 'Intermediate',
        duration: 'Months 4-6',
        description: 'Expand your repertoire with barre chords, fingerpicking, and music theory.',
        skills: ['Barre chords and power chords', 'Fingerpicking techniques', 'Music theory basics', 'Song arrangement'],
      },
      {
        stage: 'Advanced',
        duration: 'Months 7+',
        description: 'Master advanced techniques, improvisation, and composition.',
        skills: ['Solo improvisation', 'Advanced music theory', 'Composition and songwriting', 'Performance skills'],
      },
    ],
    benefits: [
      { icon: 'SparklesIcon', title: 'Cognitive Benefits', description: 'Enhances memory, improves concentration, and develops hand-eye coordination. Research shows playing an instrument stimulates multiple brain areas simultaneously.' },
      { icon: 'SmileIcon', title: 'Emotional Expression', description: 'Provides a powerful outlet for emotional expression and stress relief. Music allows you to channel feelings in a creative and therapeutic way.' },
      { icon: 'PerformanceIcon', title: 'Versatile Instrument', description: 'One of the most versatile instruments, suitable for virtually every music genre. Explore endless musical possibilities and find your unique voice.' },
    ],
    practiceTips: {
      routineTips: [
        'Start with 5-10 minutes of warm-up exercises to prevent injury',
        'Practice scales and chord changes for muscle memory',
        'Dedicate time to learning new songs and techniques',
        'End with playing songs you enjoy to maintain motivation',
        'Aim for consistent daily practice rather than long sporadic sessions',
      ],
      mistakes: [
        'Skipping proper posture and hand positioning basics',
        'Practicing too fast before mastering slow, accurate playing',
        'Neglecting music theory and only focusing on tabs',
        'Not using a metronome to develop timing and rhythm',
        'Avoiding difficult techniques instead of breaking them down',
      ],
    },
    cta: {
      title: 'Ready to Start Your Guitar Journey?',
      description: 'Whether you\'re a complete beginner or looking to refine your skills, our professional guitar classes provide the guidance and support you need. Contact us to learn more about our curriculum, schedule, and how we can help you achieve your musical goals.',
    },
    images: {
      heroImage: '/guitarCloud.png',
      curriculumImage: '/guitar-class1.jpg',
      teachingImage: '/guitar-class.jpg',
    },
    metadata: {
      title: 'Guitar Classes in Lahore | Learn Acoustic & Electric Guitar Online & Offline',
      description: 'Professional guitar classes in Lahore. Learn acoustic & electric guitar from expert instructors. Beginner to advanced training. Book now: +92 322 407 1299. Studio & home classes available.',
      keywords: 'guitar classes, guitar lessons, learn guitar, guitar training, acoustic guitar lessons, electric guitar classes, guitar instructor, online guitar lessons, beginner guitar lessons, advanced guitar training, professional guitar classes',
      ogTitle: 'Guitar Classes in Lahore | Learn Acoustic & Electric Guitar',
      ogDescription: 'Professional guitar classes in Lahore. Learn acoustic & electric guitar. Expert instructors. Book now: +92 322 407 1299',
      ogUrl: 'https://mustafazahid.com/music-classes/guitar-classes-in-lahore',
      ogImage: 'https://mustafazahid.com/mz-logo.png',
      twitterTitle: 'Guitar Classes & Lessons | Learn Acoustic & Electric Guitar',
      twitterDescription: 'Join professional guitar classes and lessons. Beginner to advanced training available. Start your guitar journey today.',
      twitterImage: 'https://mustafazahid.com/mz-logo.png',
      canonical: 'https://mustafazahid.com/music-classes/guitar-classes-in-lahore',
      robots: 'index, follow',
    },
  },
  {
    slug: 'piano-classes-in-lahore',
    title: 'Piano Classes in Lahore',
    type: 'studio',
    instrument: 'piano',
    hero: {
      badge: 'Professional Piano Training',
      title: 'Master the Art of',
      titleHighlight: 'Piano',
      description: 'Learn from expert piano instructors in a structured, professional environment. Whether you\'re a complete beginner or looking to advance your skills, our comprehensive curriculum will guide you every step of the way.',
      heroImage: '/piano.jpg',
    },
    features: [
      { icon: 'PianoIcon', title: 'Classical & Contemporary', description: 'Explore classical tradition while mastering contemporary styles, from Bach to modern pop and jazz.' },
      { icon: 'BookIcon', title: 'Complete Music Theory', description: 'Master music theory from the ground up - reading sheet music, harmony, and composition.' },
      { icon: 'TargetIcon', title: 'Expert Instruction', description: 'Learn from experienced piano teachers who are active performers and educators.' },
      { icon: 'MusicIcon', title: 'Progressive Development', description: 'Carefully designed curriculum that builds skills systematically at every level.' },
    ],
    curriculum: [
      { text: 'Proper piano posture, hand position, and finger technique' },
      { text: 'Reading sheet music: notes, rhythms, and musical notation' },
      { text: 'Basic scales, chords, and arpeggios' },
      { text: 'Music theory fundamentals: keys, intervals, and harmony' },
      { text: 'Classical repertoire from beginner to advanced levels' },
      { text: 'Contemporary styles: pop, jazz, blues, and film music' },
      { text: 'Chord progressions and accompaniment techniques' },
      { text: 'Improvisation and creative expression' },
      { text: 'Performance skills and stage presence' },
      { text: 'Composition and songwriting on piano' },
      { text: 'Piano maintenance and care' },
      { text: 'Recording and production techniques' },
    ],
    learningPaths: [
      {
        stage: 'Beginner',
        duration: 'Months 1-3',
        description: 'Establish proper technique, learn to read music, and play simple pieces.',
        skills: ['Proper hand position and posture', 'Reading basic music notation', 'Simple scales and chords', 'Playing basic melodies'],
      },
      {
        stage: 'Intermediate',
        duration: 'Months 4-9',
        description: 'Expand your repertoire with more complex pieces and advanced techniques.',
        skills: ['Advanced finger techniques', 'Complex chord progressions', 'Music theory application', 'Playing with expression'],
      },
      {
        stage: 'Advanced',
        duration: 'Months 10+',
        description: 'Master challenging repertoire, develop your unique style, and explore composition.',
        skills: ['Master-level repertoire', 'Improvisation and composition', 'Performance techniques', 'Musical interpretation'],
      },
    ],
    benefits: [],
    practiceTips: {
      routineTips: [
        'Start with 5-10 minutes of finger exercises and scales',
        'Practice sight-reading with new, easier pieces',
        'Work on your current piece, focusing on difficult sections',
        'Review previously learned pieces to maintain repertoire',
        'End with playing pieces you enjoy for motivation',
        'Use a metronome to develop steady rhythm',
      ],
      mistakes: [
        'Practicing too fast before mastering slow, accurate playing',
        'Neglecting proper hand position and posture',
        'Skipping music theory and only focusing on playing',
        'Not using a metronome, leading to inconsistent tempo',
        'Practicing only easy pieces and avoiding challenges',
        'Ignoring dynamics and musical expression',
      ],
    },
    cta: {
      title: 'Start Your Piano Journey Today',
      description: 'Whether you\'re starting from scratch or looking to advance your skills, our professional piano classes provide the comprehensive training you need. Contact us to learn more about our teaching methods, curriculum, and how we can help you achieve your musical aspirations.',
    },
    images: {
      heroImage: '/piano.jpg',
      curriculumImage: '/notes.jpg',
      teachingImage: '/piano1.jpg',
    },
    metadata: {
      title: 'Piano Classes | Learn Piano & Keyboard | Professional Piano Lessons',
      description: 'Professional piano classes in Lahore. Learn piano & keyboard from expert instructors. Beginner to advanced training. Book now: +92 322 407 1299. Studio & home classes available.',
      keywords: 'piano classes, piano lessons, learn piano, keyboard lessons, piano training, piano instructor, piano classes Karachi, piano lessons Lahore, piano classes Pakistan, beginner piano lessons, keyboard classes',
      ogTitle: 'Piano Classes - Professional Piano & Keyboard Lessons',
      ogDescription: 'Professional piano classes in Lahore. Learn piano & keyboard. Expert instructors. Book now: +92 322 407 1299',
      ogUrl: 'https://mustafazahid.com/music-classes/piano-classes-in-lahore',
      ogImage: 'https://mustafazahid.com/mz-logo.png',
      twitterTitle: 'Piano Classes - Professional Piano Lessons',
      twitterDescription: 'Learn piano and keyboard from expert instructors',
      twitterImage: 'https://mustafazahid.com/mz-logo.png',
      canonical: 'https://mustafazahid.com/music-classes/piano-classes-in-lahore',
      robots: 'index, follow',
    },
  },
  {
    slug: 'singing-classes-in-lahore',
    title: 'Singing Classes in Lahore',
    type: 'studio',
    instrument: 'singing',
    hero: {
      badge: 'Professional Vocal Training',
      title: 'Master the Art of',
      titleHighlight: 'Singing',
      description: 'Learn from expert vocal instructors in a structured, professional environment. Whether you\'re a complete beginner or looking to refine your skills, our comprehensive curriculum will guide you every step of the way.',
      heroImage: '/music-listening.png',
    },
    features: [
      { icon: 'MicrophoneIcon', title: 'Vocal Techniques', description: 'Master proper breathing, pitch control, and vocal range expansion through proven techniques.' },
      { icon: 'BookIcon', title: 'Structured Curriculum', description: 'Progressive learning path designed by professional vocal coaches, ensuring solid foundation at every level.' },
      { icon: 'TargetIcon', title: 'Personalized Instruction', description: 'Individual attention tailored to your voice type, learning style, and musical goals for maximum progress.' },
      { icon: 'MusicIcon', title: 'Performance Skills', description: 'Develop stage presence, microphone technique, and confidence for live performances and recordings.' },
    ],
    curriculum: [
      { text: 'Proper breathing techniques: diaphragmatic breathing and breath control' },
      { text: 'Vocal warm-ups and exercises for flexibility and strength' },
      { text: 'Pitch accuracy training and ear development' },
      { text: 'Vocal range expansion through safe, progressive exercises' },
      { text: 'Tone quality improvement and vocal color development' },
      { text: 'Song interpretation and emotional expression' },
      { text: 'Stage performance skills and audience engagement' },
      { text: 'Microphone technique and live performance' },
      { text: 'Recording studio techniques and vocal production' },
      { text: 'Vocal health and maintenance practices' },
      { text: 'Music theory for singers: scales, intervals, and harmony' },
      { text: 'Performance anxiety management and confidence building' },
    ],
    learningPaths: [
      {
        stage: 'Beginner',
        duration: 'Months 1-3',
        description: 'Build a solid foundation with proper breathing, basic vocal exercises, and simple songs.',
        skills: ['Basic breathing techniques', 'Simple vocal warm-ups', 'Pitch matching', 'Basic song performance'],
      },
      {
        stage: 'Intermediate',
        duration: 'Months 4-6',
        description: 'Expand your range, improve tone quality, and develop performance skills.',
        skills: ['Range expansion', 'Tone quality improvement', 'Song interpretation', 'Basic stage presence'],
      },
      {
        stage: 'Advanced',
        duration: 'Months 7+',
        description: 'Master advanced techniques, performance skills, and develop your unique vocal style.',
        skills: ['Advanced vocal techniques', 'Performance mastery', 'Recording skills', 'Vocal style development'],
      },
    ],
    benefits: [
      { icon: 'SparklesIcon', title: 'Confidence Building', description: 'Singing builds self-confidence and self-expression. Regular practice helps overcome stage fright and develop a strong, confident voice.' },
      { icon: 'SmileIcon', title: 'Emotional Expression', description: 'Vocal training provides a powerful outlet for emotional expression. Learn to convey feelings through your voice and connect with audiences.' },
      { icon: 'PerformanceIcon', title: 'Versatile Skill', description: 'Vocal skills are applicable across all music genres. From classical to pop, jazz to rock, your voice is your most versatile instrument.' },
    ],
    practiceTips: {
      routineTips: [
        'Start with 10-15 minutes of vocal warm-ups to prepare your voice',
        'Practice breathing exercises to strengthen your diaphragm',
        'Work on pitch accuracy and ear training exercises',
        'Practice songs in your comfortable range before expanding',
        'End with cool-down exercises to protect your vocal cords',
      ],
      mistakes: [
        'Singing without proper warm-up, risking vocal strain',
        'Pushing your voice beyond its natural range too quickly',
        'Neglecting breathing technique and relying on throat tension',
        'Not maintaining proper posture while singing',
        'Skipping vocal health practices and overusing your voice',
      ],
    },
    cta: {
      title: 'Ready to Start Your Singing Journey?',
      description: 'Whether you\'re a complete beginner or looking to refine your skills, our professional singing classes provide the guidance and support you need. Contact us to learn more about our curriculum, schedule, and how we can help you achieve your vocal goals.',
    },
    images: {
      heroImage: '/music-listening.png',
      curriculumImage: '/piano-notes.jpg',
      teachingImage: '/cassette.jpg',
    },
    metadata: {
      title: 'Singing Classes in Lahore | Vocal Training & Professional Singing Lessons',
      description: 'Professional singing classes in Lahore. Learn vocal techniques, breathing & performance skills. Expert instructors. Book now: +92 322 407 1299. Studio & home classes available.',
      keywords: 'singing classes Lahore, vocal training Lahore, singing lessons Lahore, voice training Lahore, vocal techniques Lahore, singing instructor Lahore, learn to sing Lahore, professional singing lessons Lahore, voice coaching Lahore',
      ogTitle: 'Singing Classes in Lahore | Professional Vocal Training',
      ogDescription: 'Professional singing classes in Lahore. Learn vocal techniques & performance skills. Expert instructors. Book now: +92 322 407 1299',
      ogUrl: 'https://mustafazahid.com/music-classes/singing-classes-in-lahore',
      ogImage: 'https://mustafazahid.com/mz-logo.png',
      twitterTitle: 'Singing Classes in Lahore | Vocal Training & Lessons',
      twitterDescription: 'Learn singing and vocal techniques from expert instructors in Lahore. Beginner to advanced voice training available.',
      twitterImage: 'https://mustafazahid.com/mz-logo.png',
      canonical: 'https://mustafazahid.com/music-classes/singing-classes-in-lahore',
      robots: 'index, follow',
    },
  },
  {
    slug: 'guitar-classes-at-home-in-lahore',
    title: 'Guitar Classes at Home in Lahore',
    type: 'at-home',
    instrument: 'guitar',
    hero: {
      badge: 'Home Guitar Training',
      title: 'Guitar Classes',
      titleHighlight: 'at Home',
      description: 'Get private guitar lessons at your home. One-on-one training with expert instructors in the comfort of your own space.',
      heroImage: '/guitarCloud.png',
    },
    features: [],
    learningPaths: [],
    benefits: [
      { icon: 'HomeIcon', title: 'Learn in Your Space', description: 'No need to travel - our expert instructors come directly to your home, saving you time and creating a comfortable learning environment where you can focus entirely on your musical development.' },
      { icon: 'UserIcon', title: 'One-on-One Attention', description: 'Receive undivided attention from your instructor. Every lesson is tailored to your specific needs, learning style, and musical goals, ensuring maximum progress in minimal time.' },
      { icon: 'ClockIcon', title: 'Flexible Scheduling', description: 'Choose lesson times that fit perfectly into your schedule. Whether you prefer morning sessions before work or evening lessons after school, we accommodate your lifestyle.' },
      { icon: 'TargetIcon', title: 'Accelerated Learning', description: 'With personalized instruction and no distractions, you\'ll progress faster than in group settings. Your instructor can immediately address your specific challenges and build on your strengths.' },
    ],
    curriculum: [
      { text: 'Learn guitar fundamentals in the comfort of your home' },
      { text: 'Personalized instruction tailored to your learning pace' },
      { text: 'Practice on your own guitar, building familiarity' },
      { text: 'Flexible scheduling that fits your lifestyle' },
      { text: 'One-on-one attention for maximum progress' },
    ],
    learningPaths: [
      {
        stage: 'Beginner',
        duration: 'Months 1-3',
        description: 'Build a solid foundation with proper technique, basic chords, and simple songs in your comfortable home environment.',
        skills: ['Basic chords and strumming', 'Simple songs', 'Proper posture', 'Guitar care basics'],
      },
      {
        stage: 'Intermediate',
        duration: 'Months 4-6',
        description: 'Expand your skills with barre chords, fingerpicking, and music theory at your own pace.',
        skills: ['Barre chords', 'Fingerpicking techniques', 'Music theory basics', 'Song arrangement'],
      },
      {
        stage: 'Advanced',
        duration: 'Months 7+',
        description: 'Master advanced techniques, improvisation, and develop your unique playing style.',
        skills: ['Advanced techniques', 'Improvisation', 'Composition', 'Performance skills'],
      },
    ],
    practiceTips: {
      routineTips: [
        'Set up a dedicated practice space with good lighting',
        'Ensure your guitar is tuned and ready before the lesson',
        'Have a notebook or device ready to take notes',
        'Eliminate distractions - turn off phones and TV',
        'Prepare questions about songs or techniques you\'re working on',
        'Keep your practice materials organized and accessible',
      ],
      mistakes: [
        'Not practicing daily - consistency is key',
        'Skipping warm-up exercises before playing',
        'Not reviewing notes from previous lessons',
        'Avoiding difficult techniques instead of working through them',
        'Not communicating with your instructor about challenges',
        'Practicing without proper posture and technique',
      ],
    },
    cta: {
      title: 'Ready for Home Guitar Lessons?',
      description: 'Experience the convenience and effectiveness of learning guitar in your own home. Our professional instructors are ready to help you achieve your musical goals with personalized, one-on-one instruction tailored to your needs. Contact us today to learn more about our home guitar lessons and schedule your first session.',
    },
    images: {
      heroImage: '/guitarCloud.png',
      curriculumImage: '/guitarCloud.png',
      teachingImage: '/guitar-class1.jpg',
    },
    metadata: {
      title: 'Guitar Classes at Home in Lahore | Private Guitar Lessons & Training',
      description: 'Private guitar classes at home in Lahore. One-on-one lessons with expert instructors. All levels. Book now: +92 322 407 1299. Convenient home-based training.',
      keywords: 'guitar classes at home Lahore, private guitar lessons Lahore, home guitar training Lahore, guitar tutor at home Lahore, guitar lessons at home Lahore, private guitar instructor Lahore, home guitar classes Lahore, home guitar lessons Lahore',
      ogTitle: 'Guitar Classes at Home in Lahore | Private Lessons',
      ogDescription: 'Private guitar classes at home in Lahore. One-on-one lessons. Expert instructors. Book now: +92 322 407 1299',
      ogUrl: 'https://mustafazahid.com/music-classes/guitar-classes-at-home-in-lahore',
      ogImage: 'https://mustafazahid.com/mz-logo.png',
      twitterTitle: 'Guitar Classes at Home in Lahore | Private Lessons',
      twitterDescription: 'Get one-on-one private guitar lessons at your home in Lahore. Learn acoustic and electric guitar with expert instructors.',
      twitterImage: 'https://mustafazahid.com/mz-logo.png',
      canonical: 'https://mustafazahid.com/music-classes/guitar-classes-at-home-in-lahore',
      robots: 'index, follow',
    },
  },
  {
    slug: 'piano-classes-at-home-in-lahore',
    title: 'Piano Classes at Home in Lahore',
    type: 'at-home',
    instrument: 'piano',
    hero: {
      badge: 'Home Piano Training',
      title: 'Piano Classes',
      titleHighlight: 'at Home',
      description: 'Get private piano lessons at your home. One-on-one training with expert instructors in your comfortable space.',
      heroImage: '/piano.jpg',
    },
    features: [],
    learningPaths: [],
    benefits: [
      { icon: 'PianoIcon', title: 'Learn on Your Piano', description: 'Practice on the exact piano you\'ll use daily, building familiarity and muscle memory. Learning on your own instrument means you\'ll develop technique specific to your piano\'s touch and sound.' },
      { icon: 'PianoIcon', title: 'Instrument Familiarity', description: 'Develop a deep connection with your piano from day one. Your instructor can assess your instrument\'s condition, provide tuning guidance, and help you understand your piano\'s unique characteristics.' },
      { icon: 'UserIcon', title: 'Private Instruction', description: 'Receive undivided attention from expert piano teachers. One-on-one lessons ensure every technique, every note, and every concept is thoroughly understood before moving forward.' },
      { icon: 'ClockIcon', title: 'Family-Friendly Schedule', description: 'Choose lesson times that work for your entire family. Perfect for parents who want to observe their children\'s lessons or for families with multiple piano students.' },
    ],
    curriculum: [
      { text: 'Learn piano fundamentals on your own instrument' },
      { text: 'Personalized instruction at your home' },
      { text: 'Practice on the piano you\'ll use daily' },
      { text: 'Flexible scheduling for your family' },
      { text: 'One-on-one attention for optimal progress' },
    ],
    learningPaths: [
      {
        stage: 'Beginner',
        duration: 'Months 1-3',
        description: 'Establish proper technique and learn to read music on your own piano.',
        skills: ['Proper hand position', 'Reading basic notation', 'Simple scales and chords', 'Basic melodies'],
      },
      {
        stage: 'Intermediate',
        duration: 'Months 4-9',
        description: 'Expand your repertoire with more complex pieces on your instrument.',
        skills: ['Advanced techniques', 'Complex pieces', 'Music theory', 'Expression'],
      },
      {
        stage: 'Advanced',
        duration: 'Months 10+',
        description: 'Master challenging repertoire and develop your unique style.',
        skills: ['Master-level repertoire', 'Improvisation', 'Composition', 'Performance'],
      },
    ],
    practiceTips: {
      routineTips: [
        'Ensure your piano is tuned and in good condition',
        'Set up proper lighting so you can see the music clearly',
        'Adjust your bench to the correct height before the lesson',
        'Have all your practice materials and sheet music ready',
        'Eliminate distractions - turn off phones and TV',
        'Prepare questions about pieces or techniques you\'re working on',
      ],
      mistakes: [
        'Practice daily, even if just for 15-20 minutes',
        'Start each practice session with scales and finger exercises',
        'Review notes from your last lesson before practicing',
        'Work on the specific pieces and exercises assigned',
        'Use a metronome to develop steady rhythm',
        'Record yourself playing to track progress and identify areas to improve',
      ],
    },
    cta: {
      title: 'Ready for Home Piano Lessons?',
      description: 'Experience the convenience and effectiveness of learning piano in your own home on your own instrument. Our professional piano instructors are ready to help you achieve your musical goals with personalized, one-on-one instruction. Contact us today to learn more about our home piano lessons and schedule your first session.',
    },
    images: {
      heroImage: '/piano.jpg',
      curriculumImage: '/piano.jpg',
      teachingImage: '/piano-notes.jpg',
    },
    metadata: {
      title: 'Piano Classes at Home | Private Piano Lessons | Home Piano Training',
      description: 'Private piano classes at home in Lahore. One-on-one lessons with expert instructors. All levels. Book now: +92 322 407 1299. Convenient home-based training.',
      keywords: 'piano classes at home, private piano lessons, home piano training, piano tutor at home, keyboard lessons at home, home piano classes Karachi, private piano instructor, piano classes at home Lahore, home piano lessons Pakistan',
      ogTitle: 'Piano Classes at Home - Private Piano Lessons',
      ogDescription: 'Private piano classes at home in Lahore. One-on-one lessons. Expert instructors. Book now: +92 322 407 1299',
      ogUrl: 'https://mustafazahid.com/music-classes/piano-classes-at-home-in-lahore',
      ogImage: 'https://mustafazahid.com/mz-logo.png',
      twitterTitle: 'Piano Classes at Home - Private Lessons',
      twitterDescription: 'Get private piano classes at your home',
      twitterImage: 'https://mustafazahid.com/mz-logo.png',
      canonical: 'https://mustafazahid.com/music-classes/piano-classes-at-home-in-lahore',
      robots: 'index, follow',
    },
  },
  {
    slug: 'singing-classes-at-home-in-lahore',
    title: 'Singing Classes at Home in Lahore',
    type: 'at-home',
    instrument: 'singing',
    hero: {
      badge: 'Home Vocal Training',
      title: 'Singing Classes',
      titleHighlight: 'at Home',
      description: 'Get private singing lessons at your home. Personalized vocal training with expert instructors in your comfortable space.',
      heroImage: '/music-listening.png',
    },
    features: [],
    learningPaths: [],
    benefits: [
      { icon: 'HomeIcon', title: 'Learn in Your Space', description: 'Practice in the comfort of your own home where you feel most relaxed. This familiar environment helps reduce performance anxiety and allows you to focus entirely on developing your voice without distractions.' },
      { icon: 'MicrophoneIcon', title: 'Private Vocal Training', description: 'Receive undivided attention from expert vocal instructors. One-on-one sessions ensure that every aspect of your voice development is carefully monitored and personalized to your unique vocal characteristics and goals.' },
      { icon: 'ClockIcon', title: 'Flexible Scheduling', description: 'Choose lesson times that perfectly fit your schedule. Whether you\'re a working professional, student, or parent, we accommodate your availability to make vocal training convenient and sustainable.' },
      { icon: 'TargetIcon', title: 'Personalized Approach', description: 'Every lesson is customized based on your voice type, range, and musical interests. Your instructor adapts teaching methods to your learning style, ensuring optimal progress and vocal health.' },
    ],
    curriculum: [
      { text: 'Learn vocal techniques in your comfortable home environment' },
      { text: 'Personalized vocal training tailored to your voice' },
      { text: 'Practice in a space where you feel relaxed' },
      { text: 'Flexible scheduling that fits your lifestyle' },
      { text: 'One-on-one attention for optimal vocal development' },
    ],
    learningPaths: [
      {
        stage: 'Beginner',
        duration: 'Months 1-3',
        description: 'Build a solid foundation with proper breathing and basic vocal exercises in your home.',
        skills: ['Basic breathing', 'Simple warm-ups', 'Pitch matching', 'Basic songs'],
      },
      {
        stage: 'Intermediate',
        duration: 'Months 4-6',
        description: 'Expand your range and improve tone quality with personalized instruction.',
        skills: ['Range expansion', 'Tone improvement', 'Song interpretation', 'Stage presence'],
      },
      {
        stage: 'Advanced',
        duration: 'Months 7+',
        description: 'Master advanced techniques and develop your unique vocal style.',
        skills: ['Advanced techniques', 'Performance mastery', 'Recording skills', 'Style development'],
      },
    ],
    practiceTips: {
      routineTips: [
        'Stay well-hydrated throughout the day before your lesson',
        'Warm up your voice gently 10-15 minutes before the instructor arrives',
        'Ensure your practice space is quiet and free from distractions',
        'Have water nearby to keep your vocal cords hydrated',
        'Prepare questions about songs or techniques you\'re working on',
        'Keep your practice materials and sheet music organized',
      ],
      mistakes: [
        'Practice vocal exercises daily, even if just for 10-15 minutes',
        'Record yourself singing to track progress and identify areas to improve',
        'Review notes from your last lesson before practicing',
        'Work on the specific exercises your instructor assigned',
        'Never practice when your voice is tired or hoarse',
        'Maintain good vocal health habits: hydration, rest, and proper technique',
      ],
    },
    cta: {
      title: 'Ready for Home Singing Lessons?',
      description: 'Experience the convenience and effectiveness of learning to sing in your own home. Our professional vocal instructors are ready to help you discover and develop your unique voice with personalized, one-on-one instruction. Contact us today to learn more about our home singing lessons and schedule your first session.',
    },
    images: {
      heroImage: '/music-listening.png',
      curriculumImage: '/music-listening.png',
      teachingImage: '/music-notes.jpg',
    },
    metadata: {
      title: 'Singing Classes at Home in Lahore | Private Vocal Lessons & Training',
      description: 'Private singing classes at home in Lahore. One-on-one vocal training with expert instructors. All levels. Book now: +92 322 407 1299. Convenient home-based lessons.',
      keywords: 'singing classes at home Lahore, private singing lessons Lahore, home vocal training Lahore, singing tutor at home Lahore, voice lessons at home Lahore, home singing classes Lahore, private vocal instructor Lahore, one-on-one singing lessons Lahore, home singing training Lahore',
      ogTitle: 'Singing Classes at Home in Lahore | Private Vocal Lessons',
      ogDescription: 'Private singing classes at home in Lahore. One-on-one vocal training. Expert instructors. Book now: +92 322 407 1299',
      ogUrl: 'https://mustafazahid.com/music-classes/singing-classes-at-home-in-lahore',
      ogImage: 'https://mustafazahid.com/mz-logo.png',
      twitterTitle: 'Singing Classes at Home in Lahore | Private Vocal Lessons',
      twitterDescription: 'Get one-on-one private singing lessons at your home in Lahore. Learn vocal techniques and performance skills with expert instructors.',
      twitterImage: 'https://mustafazahid.com/mz-logo.png',
      canonical: 'https://mustafazahid.com/music-classes/singing-classes-at-home-in-lahore',
      robots: 'index, follow',
    },
  },
];

export async function GET() {
  return NextResponse.json(
    {
      message: 'Class Migration Endpoint',
      instruction: 'Use POST method to run migration',
      totalClasses: migrationData.length,
      classes: migrationData.map(c => ({ slug: c.slug, title: c.title })),
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const results = [];
    const errors = [];

    for (const classData of migrationData) {
      try {
        // Check if class already exists
        const existing = await Class.findOne({ slug: classData.slug });
        if (existing) {
          results.push({ slug: classData.slug, status: 'skipped', message: 'Already exists' });
          continue;
        }

        // Transform data to match schema - ensure images object is properly structured
        const transformedData = {
          ...classData,
          images: {
            heroImage: classData.images.heroImage,
            curriculumImage: classData.images.curriculumImage,
            teachingImage: classData.images.teachingImage,
          },
        };

        // Create new class
        const newClass = new Class(transformedData);
        await newClass.save();
        results.push({ slug: classData.slug, status: 'created', message: 'Successfully migrated' });
      } catch (error: any) {
        console.error(`Error migrating ${classData.slug}:`, error);
        errors.push({ slug: classData.slug, error: error.message });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Migration completed',
        total: migrationData.length,
        results,
        errors: errors.length > 0 ? errors : undefined,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error during migration:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to migrate classes' },
      { status: 500 }
    );
  }
}

