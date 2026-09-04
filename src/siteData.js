// Central place for the content that used to be hand-duplicated inline in
// index.html. Editing gym info, pricing, classes, or the weekly schedule now
// means changing data here rather than hunting through HTML markup.

module.exports = {
  gymName: 'Titans',
  gymNameAccent: 'Club',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/classes', label: 'Classes' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/pricing', label: 'Price' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ],

  contact: {
    address: 'Gali no 11, House no 11, Lucknow',
    phone: '+91 9999999999',
    email: 'info@gym.com',
    social: {
      facebook: 'https://www.facebook.com/YourGymName',
      instagram: 'https://www.instagram.com/in/yourgymname',
      whatsapp: 'https://www.whatsapp.com/in/9999999999',
      youtube: 'https://www.youtube.com/yourgymname',
    },
  },

  aboutBoxes: [
    {
      image: 'about1.jpg',
      title: 'Free Consultation',
      text: "Get expert guidance tailored to your fitness goals. Our trainers will assess your current fitness level, understand your needs, and create a practical plan to help you get started with confidence. Whether you're new to fitness or looking to improve your routine, our free consultation is the perfect first step.",
    },
    {
      image: 'about2.jpg',
      title: 'Best Training',
      text: 'Train smarter with professional guidance and effective workout programs. Our experienced trainers combine strength, cardio, and functional exercises to help you build endurance, improve performance, and stay motivated. Every session is designed to challenge you while keeping your goals and fitness level.',
    },
    {
      image: 'about3.jpg',
      title: 'Build Perfect Body',
      text: "Transform your body with consistent training, proper technique, and personalized fitness support. From building lean muscle to improving strength and overall fitness, we'll help you develop healthy habits and achieve visible results. Stay committed, train with purpose, and become the strongest version of yourself.",
    },
  ],

  services: [
    {
      title: 'Cardiovascular Equipment',
      text: 'Improve your stamina, heart health, and overall endurance with our range of cardiovascular equipment. Treadmills, exercise bikes, cross trainers, and other cardio machines provide effective workouts for burning calories and strengthening your cardiovascular system.',
    },
    {
      title: 'Strength Training Equipment',
      text: 'Build strength, increase muscle tone, and improve your physical performance with our strength training equipment. Our machines and free weights are suitable for beginners and experienced members, allowing you to create a safe and effective strength-focused workout.',
    },
    {
      title: 'Group Fitness Class',
      text: 'Stay motivated and make fitness more enjoyable with our energetic group fitness classes. Train alongside others while following instructor-led workouts designed to improve strength, flexibility, endurance, and overall fitness in a fun and supportive environment.',
    },
    {
      title: 'Other Services',
      text: 'Enjoy a complete fitness experience with additional services tailored to your needs. From personal training and fitness assessments to customized workout plans and guidance, our team provides the support you need to stay motivated and make lasting progress.',
    },
  ],

  classes: [
    {
      name: 'Stretching Training',
      price: '₹700',
      image: 'class1.jpg',
      text: 'Improve flexibility, mobility, and muscle recovery with our dedicated stretching training. Guided exercises help release muscle tension.',
    },
    {
      name: 'Strength Training',
      price: '₹1300',
      image: 'class1.jpg',
      text: 'Build muscle, increase endurance, and improve overall fitness with our comprehensive strength training programs. Our expert trainers will guide you through safe and effective exercises.',
    },
  ],

  schedule: [
    { day: 'Monday', time: '9:00 AM', className: 'Cardio', span: '9:00 AM to 10:00 PM', room: 'Room No:210' },
    { day: 'Tuesday', time: '9:00 AM', className: 'Body Building', span: '9:00 AM to 10:00 PM', room: 'Room No:211' },
    { day: 'Wednesday', time: '9:00 AM', className: 'Zumba', span: '9:00 AM to 10:00 PM', room: 'Room No:210' },
    { day: 'Thursday', time: '9:00 AM', className: 'Body Building', span: '9:00 AM to 10:00 PM', room: 'Room No:211' },
    { day: 'Friday', time: '9:00 AM', className: 'YOGA', span: '9:00 AM to 10:00 PM', room: 'Room No:210' },
    { day: 'Saturday', time: '9:00 AM', className: 'Body Building', span: '9:00 AM to 10:00 PM', room: 'Room No:211' },
  ],

  gallery: ['gallery1.jpg', 'gallery2.jpg', 'gallery3.jpg', 'gallery4.jpg'],

  plans: [
    {
      id: 'starter',
      name: 'Starter',
      price: '₹800/Month',
      image: 'price1.jpg',
      tagline: 'Perfect for getting started with your fitness journey.',
      features: ['Get Free WiFi', 'Gym and Cardio', 'Free Fitness Assessment'],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '₹1000/Month',
      image: 'price2.jpg',
      tagline: 'A balanced plan for consistent fitness progress.',
      features: ['Get Free WiFi', 'Nutrition Guidance', 'No Time Restrictions', 'Gym and Cardio', 'Service Locker Rooms'],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹1300/Month',
      image: 'price3.jpg',
      tagline: 'The complete package for serious fitness enthusiasts.',
      features: [
        'Get Free WiFi',
        'Nutrition Guidance',
        'Personal Training Sessions',
        'All Group Fitness Classes',
        'No Time Restrictions',
        'Gym and Cardio',
        'Service Locker Rooms',
      ],
    },
  ],
};
