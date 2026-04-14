import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 9, category, featured } = req.query;
    const skip = (page - 1) * limit;

    // Mock projects data - replace with database integration
    const projects = [
      {
        _id: '1',
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Modern e-commerce solution with advanced features',
        longDescription: 'A comprehensive e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing, and responsive design.',
        category: 'development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
            alt: 'E-commerce platform dashboard',
            isMain: true
          }
        ],
        featured: true,
        clientUrl: 'https://example.com',
        caseStudy: 'Increased sales by 150% in first quarter',
        tags: ['ecommerce', 'react', 'nodejs'],
        isActive: true,
        createdAt: new Date('2024-01-15'),
        sortOrder: 1
      },
      {
        _id: '2',
        title: 'Mobile Banking App',
        slug: 'mobile-banking-app',
        description: 'Secure and intuitive mobile banking application',
        longDescription: 'A feature-rich mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.',
        category: 'development',
        technologies: ['React Native', 'Firebase', 'Node.js'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
            alt: 'Mobile banking app interface',
            isMain: true
          }
        ],
        featured: true,
        clientUrl: 'https://example.com',
        caseStudy: '50,000+ active users within 6 months',
        tags: ['mobile', 'banking', 'react-native'],
        isActive: true,
        createdAt: new Date('2024-02-20'),
        sortOrder: 2
      },
      {
        _id: '3',
        title: 'SaaS Dashboard',
        slug: 'saas-dashboard',
        description: 'Analytics dashboard for SaaS businesses',
        longDescription: 'A comprehensive analytics dashboard providing real-time insights, customizable reports, and data visualization tools for SaaS companies.',
        category: 'design',
        technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            alt: 'SaaS analytics dashboard',
            isMain: true
          }
        ],
        featured: false,
        clientUrl: 'https://example.com',
        caseStudy: 'Improved decision-making by 40%',
        tags: ['dashboard', 'analytics', 'vuejs'],
        isActive: true,
        createdAt: new Date('2024-03-10'),
        sortOrder: 3
      },
      {
        _id: '4',
        title: 'Restaurant Booking System',
        slug: 'restaurant-booking-system',
        description: 'Complete restaurant management and booking platform',
        longDescription: 'A comprehensive restaurant management system featuring online reservations, table management, menu ordering, and customer relationship management.',
        category: 'development',
        technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Twilio'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
            alt: 'Restaurant booking interface',
            isMain: true
          }
        ],
        featured: false,
        clientUrl: 'https://example.com',
        caseStudy: 'Reduced no-shows by 30%',
        tags: ['restaurant', 'booking', 'nextjs'],
        isActive: true,
        createdAt: new Date('2024-04-05'),
        sortOrder: 4
      },
      {
        _id: '5',
        title: 'Fitness Tracker App',
        slug: 'fitness-tracker-app',
        description: 'Personal fitness tracking and coaching application',
        longDescription: 'A comprehensive fitness tracking app with workout plans, nutrition tracking, progress monitoring, and personalized coaching features.',
        category: 'development',
        technologies: ['Flutter', 'Firebase', 'Node.js'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
            alt: 'Fitness tracking app',
            isMain: true
          }
        ],
        featured: true,
        clientUrl: 'https://example.com',
        caseStudy: '10,000+ downloads in first month',
        tags: ['fitness', 'mobile', 'flutter'],
        isActive: true,
        createdAt: new Date('2024-05-12'),
        sortOrder: 5
      },
      {
        _id: '6',
        title: 'Real Estate Platform',
        slug: 'real-estate-platform',
        description: 'Property listing and management platform',
        longDescription: 'A comprehensive real estate platform featuring property listings, virtual tours, mortgage calculators, and agent management tools.',
        category: 'development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Mapbox'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
            alt: 'Real estate platform',
            isMain: true
          }
        ],
        featured: false,
        clientUrl: 'https://example.com',
        caseStudy: '200+ property listings added monthly',
        tags: ['realestate', 'react', 'mapbox'],
        isActive: true,
        createdAt: new Date('2024-06-18'),
        sortOrder: 6
      }
    ];

    // Apply filters
    let filteredProjects = projects.filter(project => project.isActive);
    
    if (category) {
      filteredProjects = filteredProjects.filter(project => project.category === category);
    }
    
    if (featured === 'true') {
      filteredProjects = filteredProjects.filter(project => project.featured);
    }

    const total = filteredProjects.length;
    const paginatedProjects = filteredProjects
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .slice(skip, skip + parseInt(limit));

    // Get categories
    const categories = [...new Set(projects.map(p => p.category))];

    res.json({
      status: 'success',
      data: {
        projects: paginatedProjects,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        },
        categories
      }
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve projects'
    });
  }
});

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const projects = [
      {
        _id: '1',
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Modern e-commerce solution with advanced features',
        category: 'development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
            alt: 'E-commerce platform dashboard',
            isMain: true
          }
        ],
        featured: true,
        clientUrl: 'https://example.com',
        caseStudy: 'Increased sales by 150% in first quarter',
        tags: ['ecommerce', 'react', 'nodejs'],
        isActive: true,
        sortOrder: 1
      },
      {
        _id: '2',
        title: 'Mobile Banking App',
        slug: 'mobile-banking-app',
        description: 'Secure and intuitive mobile banking application',
        category: 'development',
        technologies: ['React Native', 'Firebase', 'Node.js'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
            alt: 'Mobile banking app interface',
            isMain: true
          }
        ],
        featured: true,
        clientUrl: 'https://example.com',
        caseStudy: '50,000+ active users within 6 months',
        tags: ['mobile', 'banking', 'react-native'],
        isActive: true,
        sortOrder: 2
      },
      {
        _id: '5',
        title: 'Fitness Tracker App',
        slug: 'fitness-tracker-app',
        description: 'Personal fitness tracking and coaching application',
        category: 'development',
        technologies: ['Flutter', 'Firebase', 'Node.js'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
            alt: 'Fitness tracking app',
            isMain: true
          }
        ],
        featured: true,
        clientUrl: 'https://example.com',
        caseStudy: '10,000+ downloads in first month',
        tags: ['fitness', 'mobile', 'flutter'],
        isActive: true,
        sortOrder: 5
      }
    ];

    res.json({
      status: 'success',
      data: projects
    });

  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve featured projects'
    });
  }
});

// @route   GET /api/projects/:slug
// @desc    Get single project by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const projects = [
      {
        _id: '1',
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        description: 'Modern e-commerce solution with advanced features',
        longDescription: 'A comprehensive e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing, and responsive design.',
        category: 'development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        images: [
          {
            url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
            alt: 'E-commerce platform dashboard',
            isMain: true
          },
          {
            url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
            alt: 'E-commerce product page',
            isMain: false
          }
        ],
        featured: true,
        clientUrl: 'https://example.com',
        caseStudy: 'Increased sales by 150% in first quarter',
        tags: ['ecommerce', 'react', 'nodejs'],
        isActive: true,
        createdAt: new Date('2024-01-15'),
        sortOrder: 1,
        challenges: ['Complex payment integration', 'Real-time inventory management', 'Scalability requirements'],
        solutions: ['Implemented microservices architecture', 'Used Redis for caching', 'Optimized database queries'],
        results: ['150% sales increase', '99.9% uptime', '50% faster page loads']
      }
    ];

    const project = projects.find(p => p.slug === req.params.slug && p.isActive);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    // Get related projects
    const relatedProjects = projects
      .filter(p => p._id !== project._id && p.category === project.category)
      .slice(0, 3);

    res.json({
      status: 'success',
      data: {
        project,
        relatedProjects
      }
    });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve project'
    });
  }
});

export default router;
