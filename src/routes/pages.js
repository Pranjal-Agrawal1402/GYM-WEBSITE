const express = require('express');
const router = express.Router();
const site = require('../siteData');

router.get('/', (req, res) => {
  res.render('index', {
    activeNav: '/',
    pageTitle: `${site.gymName} ${site.gymNameAccent} — Gym & Fitness Studio`,
    metaDescription:
      'Titans Club is a modern gym offering personal training, group fitness classes, and flexible membership plans.',
    site,
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    activeNav: '/about',
    pageTitle: `About Us — ${site.gymName} ${site.gymNameAccent}`,
    metaDescription: 'Learn what makes Titans Club different: expert trainers, modern equipment, and a plan built around your goals.',
    site,
  });
});

router.get('/services', (req, res) => {
  res.render('services', {
    activeNav: '/services',
    pageTitle: `Services — ${site.gymName} ${site.gymNameAccent}`,
    metaDescription: 'Explore our cardio, strength training, and group fitness services.',
    site,
  });
});

router.get('/classes', (req, res) => {
  res.render('classes', {
    activeNav: '/classes',
    pageTitle: `Classes — ${site.gymName} ${site.gymNameAccent}`,
    metaDescription: 'Browse instructor-led classes designed to build strength, flexibility, and endurance.',
    site,
  });
});

router.get('/schedule', (req, res) => {
  res.render('schedule', {
    activeNav: '/schedule',
    pageTitle: `Class Schedule — ${site.gymName} ${site.gymNameAccent}`,
    metaDescription: 'See this week’s class schedule and plan which sessions to join.',
    site,
  });
});

router.get('/pricing', (req, res) => {
  res.render('pricing', {
    activeNav: '/pricing',
    pageTitle: `Membership Plans — ${site.gymName} ${site.gymNameAccent}`,
    metaDescription: 'Compare membership plans and pick the one that fits your fitness goals.',
    site,
  });
});

router.get('/gallery', (req, res) => {
  res.render('gallery', {
    activeNav: '/gallery',
    pageTitle: `Gallery — ${site.gymName} ${site.gymNameAccent}`,
    metaDescription: 'A look inside the gym and our training sessions.',
    site,
  });
});

module.exports = router;
