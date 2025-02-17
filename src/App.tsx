import React from 'react';
import { Github, Mail, User, BookOpen, Code2, ExternalLink, ChevronDown, Search, Linkedin, FileText } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  type: 'TP' | 'Mission' | 'PHP';
  tags: string[];
  link: string;
}

function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [openSection, setOpenSection] = React.useState<'TP' | 'Mission' | 'PHP' | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 5;

  // Lazy loading observer
  const observer = React.useRef<IntersectionObserver | null>(null);
  const lastProjectRef = React.useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setCurrentPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const projects: Project[] = [
    {
      title: "TP 1 - Introduction HTML",
      description: "Création de pages web sur les métiers de l'informatique avec HTML et CSS",
      type: "TP",
      tags: ["HTML", "CSS", "Web"],
      link: "/exercises/tp/tp1/index.html"
    },
    {
      title: "TP 2 - Frames HTML",
      description: "Utilisation des frames HTML pour créer une navigation entre pages",
      type: "TP",
      tags: ["HTML", "Frames"],
      link: "/exercises/tp/tp2/index.html"
    },
    {
      title: "TP 3 - Formulaires",
      description: "Création de formulaires stylisés avec animations CSS",
      type: "TP",
      tags: ["HTML", "CSS", "Forms"],
      link: "/exercises/tp/tp3/index.html"
    },
    {
      title: "TP 4 - Mise en page",
      description: "Exercices de mise en page avec flexbox et grid",
      type: "TP",
      tags: ["HTML", "CSS", "Layout"],
      link: "/exercises/tp/tp4/index.html"
    },
    {
      title: "TP 5 - Calculatrice",
      description: "Création d'une calculatrice interactive avec JavaScript",
      type: "TP",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "/exercises/tp/tp5/index.html"
    },
    {
      title: "TP 6 - Authentification",
      description: "Système d'authentification simple en JavaScript",
      type: "TP",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "/exercises/tp/tp6/index.html"
    },
    {
      title: "TP 7 - Facture",
      description: "Application de facturation avec calculs automatiques",
      type: "TP",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "/exercises/tp/tp7/index.html"
    },
    {
      title: "TP 8 - MySQL",
      description: "Introduction à MySQL et aux bases de données",
      type: "TP",
      tags: ["PHP", "MySQL"],
      link: "/exercises/tp/tp8/index.html"
    },
    {
      title: "TP 9 - Gestion BDD",
      description: "Gestion de base de données avec interface web",
      type: "TP",
      tags: ["PHP", "MySQL", "SQL"],
      link: "/exercises/tp/tp9/index.html"
    },
    {
      title: "Mission 1 - Métiers IT",
      description: "Présentation des différents métiers de l'informatique",
      type: "Mission",
      tags: ["HTML", "CSS", "Responsive"],
      link: "/exercises/missions/mission1/index.html"
    },
    {
      title: "Mission 2 - Portail BTS SIO",
      description: "Création d'un portail d'information pour le BTS SIO",
      type: "Mission",
      tags: ["HTML", "CSS", "iframes"],
      link: "/exercises/missions/mission2/index.html"
    },
    {
      title: "Mission 3 - Page Web",
      description: "Développement d'une page web avec navigation",
      type: "Mission",
      tags: ["HTML", "CSS"],
      link: "/exercises/missions/mission3/index.html"
    },
    {
      title: "Mission 4 - TEDx",
      description: "Site web pour un événement TEDx avec système d'inscription",
      type: "Mission",
      tags: ["HTML", "CSS", "Forms"],
      link: "/exercises/missions/mission4/index.html"
    },
    {
      title: "Mission 5 - CV",
      description: "Création d'un CV en ligne avec mise en page moderne",
      type: "Mission",
      tags: ["HTML", "CSS"],
      link: "/exercises/missions/mission5/index.html"
    },
    {
      title: "Mission 8 - Formation JS",
      description: "Plateforme d'auto-formation en JavaScript",
      type: "Mission",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "/exercises/missions/mission8/index.html"
    },
    {
      title: "Mission 9 - Quiz",
      description: "Application de quiz interactif",
      type: "Mission",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "/exercises/missions/mission9/index.html"
    },
    {
      title: "Mission 10 - Facturation",
      description: "Module de facturation avec calculs automatiques",
      type: "Mission",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "/exercises/missions/mission10/index.html"
    },
    {
      title: "Gestion de Commandes",
      description: "Application PHP de gestion de commandes avec base de données MySQL",
      type: "PHP",
      tags: ["PHP", "MySQL", "CRUD"],
      link: "/exercises/php/commandes/index.html"
    }
  ];

  const groupedProjects = {
    TP: projects.filter(p => p.type === 'TP'),
    Mission: projects.filter(p => p.type === 'Mission'),
    PHP: projects.filter(p => p.type === 'PHP')
  };

  const filteredProjects = {
    TP: projects.filter(p => p.type === 'TP' && 
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))),
    Mission: projects.filter(p => p.type === 'Mission' &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))),
    PHP: projects.filter(p => p.type === 'PHP' &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))))
  };

  const paginatedProjects = React.useMemo(() => {
    return {
      TP: filteredProjects.TP.slice(0, currentPage * ITEMS_PER_PAGE),
      Mission: filteredProjects.Mission.slice(0, currentPage * ITEMS_PER_PAGE),
      PHP: filteredProjects.PHP.slice(0, currentPage * ITEMS_PER_PAGE)
    };
  }, [filteredProjects, currentPage]);

  const toggleSection = (section: 'TP' | 'Mission' | 'PHP') => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <header className="relative text-white min-h-[80vh]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/y0hYwC7IP1I?autoplay=1&mute=1&controls=0&loop=1&playlist=y0hYwC7IP1I&vq=hd1080&modestbranding=1&rel=0"
            className="absolute w-[150%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
            allow="autoplay"
            frameBorder="0"
          ></iframe>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>
        <div className="relative container mx-auto px-6 py-32 min-h-[80vh] flex items-center justify-center">
          <div className="flex flex-col items-center text-center animate-fade-in">
            <img
              src="https://avatars.githubusercontent.com/u/86472519?v"
              loading="lazy"
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg mb-8 animate-fade-in-down"
            />
            <h1 className="text-6xl font-bold mb-6 animate-fade-in-down" style={{ animationDelay: '200ms' }}>matskotrapstar</h1>
            <p className="text-2xl text-blue-100 mb-8 animate-fade-in-down" style={{ animationDelay: '400ms' }}>étudiant en BTS SIO - ingetis</p>
            <div className="flex gap-4 animate-fade-in-down" style={{ animationDelay: '600ms' }}>
              <a href="https://github.com/matskobinks" className="hover:text-blue-200 transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/mathis-barbier-guerbette-563268316/" className="hover:text-blue-200 transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:contact@example.com" className="hover:text-blue-200 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-center gap-2 mb-8">
            <User className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold">à propos</h2>
          </div>
          <p className="text-gray-300 text-xl text-center mx-auto max-w-4xl leading-relaxed">
            salut je m'appelle mathis je suis en première année de BTS SIO chez ingetis l'école est pas mal en vrai donc sah venez. le savais tu, le savais tu le poisson pané eh bah il est né enft 
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-center gap-2 mb-12">
            <Code2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold">exos</h2>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher par titre, description ou technologie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          {/* Accordion Sections */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* TP Section */}
            <div className="bg-gray-800/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('TP')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-blue-400">
                  Travaux Pratiques ({filteredProjects.TP.length})
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${openSection === 'TP' ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openSection === 'TP' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 space-y-6">
                  {paginatedProjects.TP.map((project, index) => (
                    <div 
                      ref={index === paginatedProjects.TP.length - 1 ? lastProjectRef : null}
                      key={index} 
                      className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-700"
                    >
                      <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.path ? `/exercises/${project.path}/index.html` : project.link}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300"
                      >
                        voir le tp <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Missions Section */}
            <div className="bg-gray-800/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('Mission')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-blue-400">
                  Missions ({filteredProjects.Mission.length})
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${openSection === 'Mission' ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openSection === 'Mission' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 space-y-6">
                  {paginatedProjects.Mission.map((project, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-700">
                      <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.path ? `/exercises/${project.path}/index.html` : project.link}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300"
                      >
                        voir la mission <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PHP Section */}
            <div className="bg-gray-800/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection('PHP')}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-blue-400">
                  Projet PHP ({filteredProjects.PHP.length})
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${openSection === 'PHP' ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openSection === 'PHP' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-6 space-y-6">
                  {paginatedProjects.PHP.map((project, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-700">
                      <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.path ? `/exercises/${project.path}/index.html` : project.link}
                        className="inline-flex items-center text-blue-400 hover:text-blue-300"
                      >
                        voir l'application <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-center gap-2 mb-8">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <h2 className="text-3xl font-bold">formation</h2>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4">BTS SIO (Services Informatiques aux Organisations)</h3>
              <p className="text-gray-300 text-xl">ingetis • 2023 - présent</p>
              <p className="text-gray-300 mt-4 text-lg leading-relaxed">
                formation en développement d'applications et gestion de systèmes d'information, 
                couvrant les aspects techniques et professionnels du métier d'informaticien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2024 matskotrapstar.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://github.com/matskobinks" className="hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/mathis-barbier-guerbette-563268316/" className="hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="/CV.pdf" className="hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer" download>
              <FileText className="w-5 h-5" />
            </a>
            <a href="mailto:matskotrapstar@garsrelou.eu" className="hover:text-blue-300 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;