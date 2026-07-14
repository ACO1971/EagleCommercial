export const site = {
  name: 'Eagle Commercial S.A.',
  shortName: 'Eagle Commercial',
  productionUrl: 'https://www.eaglecommercial.com.co',
  email: 'info@eaglecommercial.com.co',
  phone: '(+57) 617 1933',
  mobile: '317 435 2828',
  city: 'Bogotá D.C., Colombia',
  address: 'Cra. 11A No. 93-93, oficinas 405 y 406',
  hours: 'Lunes a viernes, 8:00 a. m. a 5:00 p. m.',
  nit: '830.040.391-7',
  themeColor: '#0a0f18'
};

export const routes = {
  es: {
    home: { path: '', label: 'Inicio' },
    company: { path: 'compania', label: 'Compañía' },
    capabilities: { path: 'capacidades', label: 'Capacidades' },
    sectors: { path: 'sectores', label: 'Sectores' },
    engineering: { path: 'ingenieria', label: 'Ingeniería' },
    support: { path: 'soporte', label: 'Soporte' },
    group: { path: 'eagle-group', label: 'Eagle Group' },
    contact: { path: 'contacto', label: 'Contacto' },
    access: { path: 'acceso', label: 'Área autorizada' },
    privacy: { path: 'privacidad', label: 'Privacidad y cookies' },
    data: { path: 'tratamiento-datos', label: 'Tratamiento de datos' }
  },
  en: {
    home: { path: 'en', label: 'Home' },
    company: { path: 'en/company', label: 'Company' },
    capabilities: { path: 'en/capabilities', label: 'Capabilities' },
    sectors: { path: 'en/sectors', label: 'Sectors' },
    engineering: { path: 'en/engineering', label: 'Engineering' },
    support: { path: 'en/support', label: 'Support' },
    group: { path: 'en/eagle-group', label: 'Eagle Group' },
    contact: { path: 'en/contact', label: 'Contact' },
    access: { path: 'en/authorized-access', label: 'Authorized access' },
    privacy: { path: 'en/privacy', label: 'Privacy and cookies' },
    data: { path: 'en/data-processing', label: 'Data processing' }
  }
};

export const capabilities = [
  {
    id: 'situational-awareness',
    icon: 'radar',
    visual: 'visual-command.svg',
    es: {
      title: 'Inteligencia y conocimiento situacional',
      description: 'Capacidades orientadas a integrar información de distintas fuentes y convertirla en conocimiento útil para la toma de decisiones, dentro del marco legal aplicable.',
      problem: 'Reduce la fragmentación de información y facilita una lectura coherente del entorno operacional.',
      applications: ['Centros de operación', 'Protección de activos', 'Coordinación interinstitucional']
    },
    en: {
      title: 'Intelligence and situational awareness',
      description: 'Capabilities designed to integrate information from multiple sources and turn it into actionable knowledge within the applicable legal framework.',
      problem: 'Reduces fragmented information and supports a coherent view of the operational environment.',
      applications: ['Operations centers', 'Asset protection', 'Inter-agency coordination']
    }
  },
  {
    id: 'critical-communications',
    icon: 'network',
    visual: 'visual-signals.svg',
    es: {
      title: 'Comunicaciones críticas',
      description: 'Arquitecturas de voz, datos y conectividad para operaciones fijas, móviles o desplegables que requieren coordinación confiable en condiciones exigentes.',
      problem: 'Ayuda a mantener conectados a equipos, centros de control y plataformas cuando la continuidad es esencial.',
      applications: ['Operaciones remotas', 'Emergencias', 'Infraestructura crítica']
    },
    en: {
      title: 'Critical communications',
      description: 'Voice, data and connectivity architectures for fixed, mobile or deployable operations that require dependable coordination in demanding conditions.',
      problem: 'Helps keep teams, control centers and platforms connected when continuity is essential.',
      applications: ['Remote operations', 'Emergency response', 'Critical infrastructure']
    }
  },
  {
    id: 'signal-analysis',
    icon: 'wave',
    visual: 'visual-signals.svg',
    es: {
      title: 'Monitoreo y análisis de señales',
      description: 'Tecnologías para observar, caracterizar y comprender el entorno electromagnético de acuerdo con la autorización, el alcance y las necesidades de cada proyecto.',
      problem: 'Permite identificar patrones, interferencias y condiciones que afectan la operación de redes y sistemas electrónicos.',
      applications: ['Gestión del espectro', 'Diagnóstico RF', 'Supervisión técnica']
    },
    en: {
      title: 'Signal monitoring and analysis',
      description: 'Technologies to observe, characterize and understand the electromagnetic environment according to each project’s authorization, scope and requirements.',
      problem: 'Helps identify patterns, interference and conditions affecting networks and electronic systems.',
      applications: ['Spectrum management', 'RF diagnostics', 'Technical monitoring']
    }
  },
  {
    id: 'electronic-security',
    icon: 'shield',
    visual: 'visual-command.svg',
    es: {
      title: 'Seguridad electrónica y contramedidas',
      description: 'Capacidades de evaluación, detección y protección frente a riesgos electrónicos que pueden comprometer información, instalaciones o procesos sensibles.',
      problem: 'Fortalece la protección de espacios, información y operaciones frente a amenazas técnicas.',
      applications: ['Entornos corporativos', 'Instalaciones sensibles', 'Evaluaciones técnicas']
    },
    en: {
      title: 'Electronic security and countermeasures',
      description: 'Assessment, detection and protection capabilities for electronic risks that may compromise information, facilities or sensitive processes.',
      problem: 'Strengthens the protection of spaces, information and operations against technical threats.',
      applications: ['Corporate environments', 'Sensitive facilities', 'Technical assessments']
    }
  },
  {
    id: 'uncrewed-protection',
    icon: 'target',
    visual: 'visual-autonomy.svg',
    es: {
      title: 'Protección frente a sistemas no tripulados',
      description: 'Arquitecturas escalables para detectar, seguir, evaluar y gestionar riesgos asociados a plataformas aéreas no tripuladas en entornos autorizados.',
      problem: 'Aumenta la capacidad de anticipación y respuesta alrededor de instalaciones y eventos críticos.',
      applications: ['Perímetros críticos', 'Eventos estratégicos', 'Infraestructura esencial']
    },
    en: {
      title: 'Protection against uncrewed systems',
      description: 'Scalable architectures to detect, track, assess and manage risks associated with uncrewed aerial platforms in authorized environments.',
      problem: 'Improves anticipation and response around critical facilities and strategic events.',
      applications: ['Critical perimeters', 'Strategic events', 'Essential infrastructure']
    }
  },
  {
    id: 'autonomous-platforms',
    icon: 'drone',
    visual: 'visual-autonomy.svg',
    es: {
      title: 'Plataformas robóticas y autónomas',
      description: 'Sistemas aéreos y terrestres para inspección, observación, transporte o intervención remota cuando reducir la exposición humana es una prioridad.',
      problem: 'Amplía el alcance operativo y permite realizar tareas en zonas complejas o de difícil acceso.',
      applications: ['Inspección industrial', 'Reconocimiento técnico', 'Atención de emergencias']
    },
    en: {
      title: 'Robotic and autonomous platforms',
      description: 'Aerial and ground systems for inspection, observation, transport or remote intervention when reducing human exposure is a priority.',
      problem: 'Extends operational reach and enables tasks in complex or difficult-to-access areas.',
      applications: ['Industrial inspection', 'Technical reconnaissance', 'Emergency response']
    }
  },
  {
    id: 'advanced-observation',
    icon: 'eye',
    visual: 'visual-infrastructure.svg',
    es: {
      title: 'Vigilancia y observación avanzada',
      description: 'Integración de sensores, sistemas ópticos, plataformas de monitoreo y centros de control para ampliar la visibilidad sobre activos y operaciones.',
      problem: 'Mejora la detección temprana, la verificación y la documentación de eventos relevantes.',
      applications: ['Seguridad perimetral', 'Supervisión de activos', 'Centros de comando']
    },
    en: {
      title: 'Advanced surveillance and observation',
      description: 'Integration of sensors, optical systems, monitoring platforms and control centers to improve visibility over assets and operations.',
      problem: 'Improves early detection, verification and documentation of relevant events.',
      applications: ['Perimeter security', 'Asset monitoring', 'Command centers']
    }
  },
  {
    id: 'digital-analysis',
    icon: 'search',
    visual: 'visual-command.svg',
    es: {
      title: 'Investigación técnica y análisis digital',
      description: 'Herramientas y servicios para apoyar la adquisición, preservación, organización y análisis autorizado de información técnica y digital.',
      problem: 'Facilita procesos estructurados, trazables y repetibles para equipos de investigación.',
      applications: ['Laboratorios', 'Investigación corporativa', 'Apoyo pericial']
    },
    en: {
      title: 'Technical investigation and digital analysis',
      description: 'Tools and services supporting the authorized acquisition, preservation, organization and analysis of technical and digital information.',
      problem: 'Enables structured, traceable and repeatable workflows for investigative teams.',
      applications: ['Laboratories', 'Corporate investigations', 'Forensic support']
    }
  },
  {
    id: 'technology-infrastructure',
    icon: 'server',
    visual: 'visual-infrastructure.svg',
    es: {
      title: 'Infraestructura tecnológica',
      description: 'Estaciones de trabajo, procesamiento, almacenamiento, redes y plataformas configuradas para aplicaciones profesionales y de misión crítica.',
      problem: 'Entrega una base tecnológica coherente, administrable y preparada para crecer con la operación.',
      applications: ['Centros de datos', 'Puestos de análisis', 'Redes operacionales']
    },
    en: {
      title: 'Technology infrastructure',
      description: 'Workstations, processing, storage, networks and platforms configured for professional and mission-critical applications.',
      problem: 'Provides a coherent, manageable technology foundation designed to grow with the operation.',
      applications: ['Data centers', 'Analysis workstations', 'Operational networks']
    }
  },
  {
    id: 'energy-continuity',
    icon: 'bolt',
    visual: 'visual-infrastructure.svg',
    es: {
      title: 'Energía y continuidad operacional',
      description: 'Sistemas de alimentación, respaldo y almacenamiento de energía para mantener capacidades esenciales en instalaciones fijas o desplegables.',
      problem: 'Reduce interrupciones y protege la continuidad de sistemas críticos frente a variaciones o fallas de suministro.',
      applications: ['Sitios remotos', 'Respaldo de comunicaciones', 'Operaciones desplegables']
    },
    en: {
      title: 'Energy and operational continuity',
      description: 'Power, backup and energy storage systems that help sustain essential capabilities in fixed or deployable environments.',
      problem: 'Reduces interruptions and protects critical systems against supply variations or outages.',
      applications: ['Remote sites', 'Communications backup', 'Deployable operations']
    }
  },
  {
    id: 'specialized-protection',
    icon: 'layers',
    visual: 'visual-infrastructure.svg',
    es: {
      title: 'Protección especializada',
      description: 'Soluciones seleccionadas según el nivel de riesgo, el entorno de uso y los requerimientos de protección personal, física u operacional.',
      problem: 'Alinea materiales, configuración y acompañamiento con el escenario real de utilización.',
      applications: ['Protección personal', 'Seguridad industrial', 'Entornos de alto riesgo']
    },
    en: {
      title: 'Specialized protection',
      description: 'Solutions selected according to risk level, operating environment and personal, physical or operational protection requirements.',
      problem: 'Aligns materials, configuration and support with the real use environment.',
      applications: ['Personal protection', 'Industrial safety', 'High-risk environments']
    }
  },
  {
    id: 'custom-engineering',
    icon: 'nodes',
    visual: 'visual-command.svg',
    es: {
      title: 'Ingeniería a la medida',
      description: 'Diseño e integración de soluciones que combinan tecnologías, plataformas, servicios y soporte alrededor de una necesidad operacional específica.',
      problem: 'Evita imponer un catálogo y construye una arquitectura alrededor del resultado que la organización necesita.',
      applications: ['Proyectos especiales', 'Integraciones multimarca', 'Modernización de capacidades']
    },
    en: {
      title: 'Custom engineering',
      description: 'Design and integration of solutions that combine technologies, platforms, services and support around a specific operational need.',
      problem: 'Avoids forcing a catalogue and builds an architecture around the outcome the organization needs.',
      applications: ['Special projects', 'Multi-vendor integration', 'Capability modernization']
    }
  }
];

export const sectors = [
  {
    id: 'defense-security', icon: 'shield', visual: 'visual-command.svg',
    es: { title: 'Defensa y seguridad', description: 'Capacidades tecnológicas para coordinación, conocimiento situacional, protección de instalaciones y apoyo a operaciones autorizadas.' },
    en: { title: 'Defense and security', description: 'Technology capabilities for coordination, situational awareness, facility protection and support to authorized operations.' }
  },
  {
    id: 'government-justice', icon: 'building', visual: 'visual-command.svg',
    es: { title: 'Gobierno y justicia', description: 'Soluciones para entidades que necesitan gestionar información, investigación, comunicaciones y continuidad institucional.' },
    en: { title: 'Government and justice', description: 'Solutions for organizations managing information, investigations, communications and institutional continuity.' }
  },
  {
    id: 'critical-infrastructure', icon: 'grid', visual: 'visual-infrastructure.svg',
    es: { title: 'Infraestructura crítica', description: 'Integración de monitoreo, comunicaciones, energía y protección para activos cuya continuidad resulta esencial.' },
    en: { title: 'Critical infrastructure', description: 'Integration of monitoring, communications, energy and protection for assets whose continuity is essential.' }
  },
  {
    id: 'energy-telecom', icon: 'bolt', visual: 'visual-signals.svg',
    es: { title: 'Energía y telecomunicaciones', description: 'Visibilidad operacional, inspección, conectividad y respaldo para redes distribuidas y emplazamientos remotos.' },
    en: { title: 'Energy and telecommunications', description: 'Operational visibility, inspection, connectivity and backup for distributed networks and remote sites.' }
  },
  {
    id: 'transport', icon: 'route', visual: 'visual-infrastructure.svg',
    es: { title: 'Transporte, puertos y aeropuertos', description: 'Tecnología para supervisar flujos, proteger perímetros, coordinar equipos y responder ante eventos críticos.' },
    en: { title: 'Transport, ports and airports', description: 'Technology to monitor flows, protect perimeters, coordinate teams and respond to critical events.' }
  },
  {
    id: 'industry', icon: 'factory', visual: 'visual-autonomy.svg',
    es: { title: 'Industria, minería y petróleo', description: 'Inspección remota, comunicaciones, monitoreo de activos y continuidad en ambientes industriales exigentes.' },
    en: { title: 'Industry, mining and oil', description: 'Remote inspection, communications, asset monitoring and continuity in demanding industrial environments.' }
  },
  {
    id: 'corporate-security', icon: 'lock', visual: 'visual-command.svg',
    es: { title: 'Seguridad corporativa', description: 'Evaluación técnica, protección de información, monitoreo y respuesta para organizaciones privadas con operaciones sensibles.' },
    en: { title: 'Corporate security', description: 'Technical assessment, information protection, monitoring and response for private organizations with sensitive operations.' }
  },
  {
    id: 'emergency', icon: 'pulse', visual: 'visual-autonomy.svg',
    es: { title: 'Atención de emergencias', description: 'Sistemas desplegables para conectar equipos, observar zonas afectadas y apoyar decisiones bajo presión.' },
    en: { title: 'Emergency response', description: 'Deployable systems to connect teams, observe affected areas and support decisions under pressure.' }
  }
];

export const processSteps = [
  {
    icon: 'message',
    es: { title: 'Comprensión del requerimiento', description: 'Definimos el resultado esperado, el entorno, las restricciones y los actores involucrados.' },
    en: { title: 'Requirement discovery', description: 'We define the expected outcome, environment, constraints and stakeholders.' }
  },
  {
    icon: 'search',
    es: { title: 'Análisis técnico y operacional', description: 'Evaluamos riesgos, dependencias, infraestructura existente y condiciones de implementación.' },
    en: { title: 'Technical and operational analysis', description: 'We assess risks, dependencies, existing infrastructure and implementation conditions.' }
  },
  {
    icon: 'nodes',
    es: { title: 'Diseño de arquitectura', description: 'Seleccionamos componentes y servicios para construir una solución coherente y escalable.' },
    en: { title: 'Architecture design', description: 'We select components and services to build a coherent, scalable solution.' }
  },
  {
    icon: 'settings',
    es: { title: 'Integración y configuración', description: 'Ajustamos interfaces, flujos, políticas y parámetros de acuerdo con el proyecto aprobado.' },
    en: { title: 'Integration and configuration', description: 'We align interfaces, workflows, policies and parameters with the approved project.' }
  },
  {
    icon: 'rocket',
    es: { title: 'Despliegue y capacitación', description: 'Implementamos, probamos y transferimos conocimiento a operadores y personal técnico.' },
    en: { title: 'Deployment and training', description: 'We implement, test and transfer knowledge to operators and technical staff.' }
  },
  {
    icon: 'life',
    es: { title: 'Soporte y evolución', description: 'Acompañamos el ciclo de vida, la continuidad, las garantías y la evolución de la capacidad.' },
    en: { title: 'Support and evolution', description: 'We support lifecycle continuity, warranties and the evolution of the capability.' }
  }
];

export const differentiators = [
  {
    icon: 'compass',
    es: { title: 'Ingeniería local', description: 'Conocimiento del entorno colombiano para convertir necesidades complejas en implementaciones viables.' },
    en: { title: 'Local engineering', description: 'Knowledge of the Colombian environment to turn complex needs into viable implementations.' }
  },
  {
    icon: 'layers',
    es: { title: 'Integración multimarca', description: 'Selección de tecnologías de diferentes proveedores según la arquitectura y no por dependencia de un único catálogo.' },
    en: { title: 'Multi-vendor integration', description: 'Technology selection based on the architecture rather than dependence on a single catalogue.' }
  },
  {
    icon: 'globe',
    es: { title: 'Acceso internacional', description: 'Relacionamiento con proveedores especializados y evaluación continua de capacidades emergentes.' },
    en: { title: 'International access', description: 'Relationships with specialized suppliers and continuous assessment of emerging capabilities.' }
  },
  {
    icon: 'box',
    es: { title: 'Gestión logística', description: 'Acompañamiento en importación, almacenamiento, nacionalización y entrega de tecnología especializada.' },
    en: { title: 'Logistics management', description: 'Support for import, storage, customs clearance and delivery of specialized technology.' }
  },
  {
    icon: 'book',
    es: { title: 'Transferencia de conocimiento', description: 'Preparación de operadores, administradores y técnicos para una adopción responsable y sostenible.' },
    en: { title: 'Knowledge transfer', description: 'Preparation of operators, administrators and technicians for responsible, sustainable adoption.' }
  },
  {
    icon: 'life',
    es: { title: 'Ciclo de vida', description: 'Soporte, mantenimiento, garantías y actualización para preservar la utilidad de la capacidad en el tiempo.' },
    en: { title: 'Lifecycle support', description: 'Support, maintenance, warranties and upgrades that preserve capability value over time.' }
  }
];



export const showcaseSolutions = [
  {
    id: 't-series',
    image: 'solution-t4.webp',
    capability: 'autonomous-platforms',
    es: {
      eyebrow: 'Intervención remota',
      title: 'Sistemas robóticos terrestres T-Series',
      description: 'Plataformas UGV para reconocimiento, inspección técnica, manipulación remota e intervención en escenarios donde reducir la exposición humana es una prioridad.',
      highlights: ['Manipulación de precisión', 'Sensores y cargas útiles modulares', 'Operación remota en entornos complejos']
    },
    en: {
      eyebrow: 'Remote intervention',
      title: 'T-Series ground robotic systems',
      description: 'UGV platforms for reconnaissance, technical inspection, remote manipulation and intervention in scenarios where reducing human exposure is a priority.',
      highlights: ['Precision manipulation', 'Modular sensors and payloads', 'Remote operation in complex environments']
    }
  },
  {
    id: 'ule-uas',
    image: 'solution-k1000.webp',
    capability: 'autonomous-platforms',
    es: {
      eyebrow: 'Cobertura persistente',
      title: 'Sistemas aéreos de ultra resistencia',
      description: 'Aeronaves eléctricas de largo alcance para observación, vigilancia técnica y operaciones de extensa duración con baja huella logística y despliegue ágil.',
      highlights: ['Despliegue rápido', 'Operación silenciosa', 'Cobertura de grandes áreas']
    },
    en: {
      eyebrow: 'Persistent coverage',
      title: 'Ultra-endurance aerial systems',
      description: 'Long-range electric aircraft for observation, technical surveillance and extended-duration missions with a low logistics footprint and agile deployment.',
      highlights: ['Rapid deployment', 'Quiet operation', 'Large-area coverage']
    }
  },
  {
    id: 'mission-cellular',
    image: 'solution-v1650.webp',
    capability: 'critical-communications',
    es: {
      eyebrow: 'Operaciones RF',
      title: 'Arquitecturas celulares de misión',
      description: 'Sistemas portátiles y vehiculares para análisis, monitoreo y capacidades celulares de misión, integrables en despliegues tácticos, centros de operación o laboratorios técnicos.',
      highlights: ['Arquitectura modular', 'Escalabilidad operativa', 'Integración móvil o fija']
    },
    en: {
      eyebrow: 'RF operations',
      title: 'Mission cellular architectures',
      description: 'Portable and vehicle-based systems for analysis, monitoring and mission cellular capabilities that integrate into tactical deployments, operations centers or technical labs.',
      highlights: ['Modular architecture', 'Operational scalability', 'Mobile or fixed integration']
    }
  },
  {
    id: 'radiogoniometry',
    image: 'solution-radiogoniometer.webp',
    capability: 'signal-analysis',
    es: {
      eyebrow: 'Ubicación de emisores',
      title: 'Radiogoniometría táctica y fija',
      description: 'Soluciones para detección direccional, geolocalización y comprensión del entorno electromagnético en configuraciones desplegables, móviles o permanentes.',
      highlights: ['Cobertura táctica y perimetral', 'Visualización operativa', 'Arquitecturas fijas o desplegables']
    },
    en: {
      eyebrow: 'Emitter location',
      title: 'Tactical and fixed radiogoniometry',
      description: 'Solutions for directional detection, geolocation and understanding of the electromagnetic environment in deployable, mobile or permanent configurations.',
      highlights: ['Tactical and perimeter coverage', 'Operational visualization', 'Fixed or deployable architectures']
    }
  },
  {
    id: 'cuas-detection',
    image: 'solution-cuas.webp',
    capability: 'uncrewed-protection',
    es: {
      eyebrow: 'Protección de espacio aéreo cercano',
      title: 'Detección perimetral C-UAS',
      description: 'Sensores y arquitecturas de alerta temprana para detectar, seguir y apoyar la evaluación de riesgos asociados a drones en infraestructuras críticas, perímetros y eventos estratégicos.',
      highlights: ['Cobertura 24/7', 'Integración con centros de control', 'Escalabilidad por capas']
    },
    en: {
      eyebrow: 'Short-range airspace protection',
      title: 'Perimeter C-UAS detection',
      description: 'Sensors and early warning architectures to detect, track and support the assessment of drone-related risks around critical infrastructure, perimeters and strategic events.',
      highlights: ['24/7 coverage', 'Control center integration', 'Layered scalability']
    }
  },
  {
    id: 'portable-energy',
    image: 'solution-energy.webp',
    capability: 'energy-continuity',
    es: {
      eyebrow: 'Autonomía en sitio',
      title: 'Energía portátil y continuidad operacional',
      description: 'Sistemas de energía y almacenamiento para respaldar comunicaciones, sensores, puestos de trabajo y despliegues técnicos en sitios remotos o escenarios de contingencia.',
      highlights: ['Configuraciones portátiles', 'Respaldo para cargas críticas', 'Escalabilidad según misión']
    },
    en: {
      eyebrow: 'On-site autonomy',
      title: 'Portable energy and operational continuity',
      description: 'Power and storage systems to support communications, sensors, workstations and technical deployments in remote sites or contingency scenarios.',
      highlights: ['Portable configurations', 'Backup for critical loads', 'Mission-based scalability']
    }
  }
];

export const institutionalClients = [
  { name: 'Ministerio de Defensa Nacional', logo: 'client-mindefensa.webp' },
  { name: 'Policía Nacional de Colombia', logo: 'client-policia.webp' },
  { name: 'Dirección de Inteligencia Policial', logo: 'client-dipol.webp' },
  { name: 'INPEC', logo: 'client-inpec.webp' },
  { name: 'Ejército Nacional de Colombia', logo: 'client-ejercito.webp' },
  { name: 'Fiscalía General de la Nación', logo: 'client-fiscalia.webp' },
  { name: 'Presidencia de la República de Colombia', logo: 'client-presidencia.webp' }
];

export const strategicRelationships = [
  {
    id: 'l3harris',
    es: { title: 'L3Harris', description: 'Tecnologías de misión, plataformas robóticas y capacidades de intervención remota.' },
    en: { title: 'L3Harris', description: 'Mission technologies, robotic platforms and remote intervention capabilities.' }
  },
  {
    id: 'octasic',
    es: { title: 'Octasic', description: 'Soluciones avanzadas de RF, arquitecturas celulares y cargas útiles modulares.' },
    en: { title: 'Octasic', description: 'Advanced RF solutions, cellular architectures and modular payloads.' }
  },
  {
    id: 'khaero',
    es: { title: 'Kraus Hamdani Aerospace', description: 'Plataformas aéreas eléctricas de largo alcance y muy baja huella logística.' },
    en: { title: 'Kraus Hamdani Aerospace', description: 'Long-range electric aerial platforms with a very low logistics footprint.' }
  },
  {
    id: 'evaluation',
    es: { title: 'Tecnologías complementarias', description: 'Evaluación continua de soluciones internacionales para ampliar el portafolio de proyectos especializados.' },
    en: { title: 'Complementary technologies', description: 'Continuous evaluation of international solutions to expand the portfolio for specialized projects.' }
  }
];

export const supportPillars = [
  {
    icon: 'headset',
    es: { title: 'Acompañamiento técnico', description: 'Canal de atención para diagnóstico, orientación y coordinación de actividades de soporte.' },
    en: { title: 'Technical assistance', description: 'A support channel for diagnostics, guidance and coordination of service activities.' }
  },
  {
    icon: 'tools',
    es: { title: 'Mantenimiento y reparación', description: 'Evaluación, mantenimiento preventivo y correctivo según acuerdos, disponibilidad y alcance autorizado.' },
    en: { title: 'Maintenance and repair', description: 'Assessment and preventive or corrective maintenance according to agreements, availability and authorized scope.' }
  },
  {
    icon: 'shield',
    es: { title: 'Gestión de garantías', description: 'Coordinación documental y técnica con proveedores para tramitar garantías y reemplazos aplicables.' },
    en: { title: 'Warranty management', description: 'Technical and documentary coordination with suppliers for applicable warranty and replacement processes.' }
  },
  {
    icon: 'book',
    es: { title: 'Capacitación', description: 'Programas para operadores, administradores y técnicos, adaptados a roles y escenarios de uso.' },
    en: { title: 'Training', description: 'Programs for operators, administrators and technicians, adapted to roles and use scenarios.' }
  },
  {
    icon: 'refresh',
    es: { title: 'Actualización de capacidades', description: 'Evaluación de obsolescencia, compatibilidad y opciones de modernización para sistemas existentes.' },
    en: { title: 'Capability upgrades', description: 'Assessment of obsolescence, compatibility and modernization options for existing systems.' }
  },
  {
    icon: 'document',
    es: { title: 'Documentación y trazabilidad', description: 'Registro de entregables, configuraciones aprobadas, intervenciones y transferencia de conocimiento.' },
    en: { title: 'Documentation and traceability', description: 'Records of deliverables, approved configurations, interventions and knowledge transfer.' }
  }
];

export const groupCompanies = [
  {
    icon: 'nodes',
    es: {
      title: 'Eagle Commercial S.A.',
      eyebrow: 'Ingeniería e integración tecnológica',
      description: 'Articula necesidades operacionales, diseño de soluciones, relacionamiento con proveedores, implementación, capacitación y soporte.'
    },
    en: {
      title: 'Eagle Commercial S.A.',
      eyebrow: 'Technology engineering and integration',
      description: 'Connects operational needs, solution design, supplier engagement, implementation, training and support.'
    }
  },
  {
    icon: 'warehouse',
    es: {
      title: 'Eagle’s Logistics Services S.A.S.',
      eyebrow: 'Logística y almacenamiento especializado',
      description: 'Apoya operaciones de almacenamiento, inventario, preparación, empaque y coordinación logística desde Zona Franca.'
    },
    en: {
      title: 'Eagle’s Logistics Services S.A.S.',
      eyebrow: 'Specialized logistics and storage',
      description: 'Supports storage, inventory, preparation, packaging and logistics coordination from the free trade zone.'
    }
  },
  {
    icon: 'globe',
    es: {
      title: 'Eagle Trade Agencia de Aduanas S.A.S. Nivel II',
      eyebrow: 'Gestión aduanera y comercio exterior',
      description: 'Acompaña procesos aduaneros y de comercio exterior dentro del marco regulatorio aplicable.'
    },
    en: {
      title: 'Eagle Trade Agencia de Aduanas S.A.S. Nivel II',
      eyebrow: 'Customs and foreign trade management',
      description: 'Supports customs and foreign trade processes within the applicable regulatory framework.'
    }
  }
];



export const clientInstitutions = [
  {
    id: 'mindefensa',
    icon: 'shield',
    es: { name: 'Ministerio de Defensa Nacional', short: 'Mindefensa' },
    en: { name: 'Ministry of National Defense', short: 'Mindefensa' }
  },
  {
    id: 'policia',
    icon: 'shield',
    es: { name: 'Policía Nacional de Colombia', short: 'Policía Nacional' },
    en: { name: 'Colombian National Police', short: 'National Police' }
  },
  {
    id: 'dipro',
    icon: 'target',
    es: { name: 'Dirección de Protección y Servicios Especiales', short: 'Protección y Servicios Especiales' },
    en: { name: 'Directorate for Protection and Special Services', short: 'Protection and Special Services' }
  },
  {
    id: 'inpec',
    icon: 'lock',
    es: { name: 'Instituto Nacional Penitenciario y Carcelario', short: 'INPEC' },
    en: { name: 'National Penitentiary and Prison Institute', short: 'INPEC' }
  },
  {
    id: 'ejercito',
    icon: 'compass',
    es: { name: 'Ejército Nacional', short: 'Ejército Nacional' },
    en: { name: 'National Army', short: 'National Army' }
  },
  {
    id: 'fiscalia',
    icon: 'document',
    es: { name: 'Fiscalía General de la Nación', short: 'Fiscalía' },
    en: { name: 'Attorney General’s Office', short: 'Attorney General' }
  },
  {
    id: 'presidencia',
    icon: 'building',
    es: { name: 'Presidencia de la República', short: 'Presidencia' },
    en: { name: 'Presidency of the Republic', short: 'Presidency' }
  }
];


export const technologyPartners = [
  {
    id: 'l3harris',
    icon: 'rocket',
    href: 'https://www.l3harris.com/',
    es: {
      name: 'L3Harris',
      status: 'Fabricante de referencia y ecosistema tecnológico',
      description: 'Tecnologías de misión crítica para defensa, seguridad y operación en entornos de alta exigencia.'
    },
    en: {
      name: 'L3Harris',
      status: 'Reference manufacturer and technology ecosystem',
      description: 'Mission-critical technologies for defense, security and operations in demanding environments.'
    }
  },
  {
    id: 'octasic',
    icon: 'network',
    href: 'https://www.octasic.com/defense',
    es: {
      name: 'Octasic Defense',
      status: 'Distribución y soluciones relacionadas con el espectro RF',
      description: 'Arquitecturas de espectro, redes celulares tácticas y soluciones modulares de bajo SWaP.'
    },
    en: {
      name: 'Octasic Defense',
      status: 'Distribution and RF spectrum-related solutions',
      description: 'Spectrum architectures, tactical cellular networks and low-SWaP modular solutions.'
    }
  },
  {
    id: 'khaero',
    icon: 'drone',
    href: 'https://www.khaero.com/k1000ule',
    es: {
      name: 'KHAero / Kraus Hamdani Aerospace',
      status: 'Plataformas aéreas de alta autonomía',
      description: 'Sistemas aéreos eléctricos y de larga permanencia orientados a cobertura extendida y vigilancia persistente.'
    },
    en: {
      name: 'KHAero / Kraus Hamdani Aerospace',
      status: 'High-endurance aerial platforms',
      description: 'Long-endurance electric aerial systems designed for extended coverage and persistent surveillance.'
    }
  },
  {
    id: 'rafael',
    icon: 'shield',
    href: 'https://www.rafael.co.il/',
    es: {
      name: 'Rafael Advanced Defense Systems',
      status: 'Referencia internacional de interés estratégico',
      description: 'Portafolio avanzado para defensa, protección de infraestructuras y tecnologías de seguridad de alto desempeño.'
    },
    en: {
      name: 'Rafael Advanced Defense Systems',
      status: 'International reference of strategic interest',
      description: 'Advanced portfolio for defense, infrastructure protection and high-performance security technologies.'
    }
  }
];

export const copy = {
  es: {
    languageName: 'Español',
    alternateLanguage: 'EN',
    skip: 'Saltar al contenido',
    navCta: 'Hablar con un especialista',
    access: 'Área autorizada',
    explore: 'Explorar capacidad',
    learnMore: 'Conocer más',
    viewAll: 'Ver todas las capacidades',
    requestInfo: 'Solicitar información',
    contactSpecialist: 'Contactar un especialista',
    legalDraft: 'Borrador pendiente de aprobación jurídica. No publicar sin revisión.',
    sensitiveWarning: 'No incluya información clasificada, reservada, técnica u operacional sensible en formularios públicos.',
    footerStatement: 'Ingeniería e integración tecnológica para organizaciones que operan en entornos críticos.',
    copyright: 'Todos los derechos reservados.',
    cookieText: 'Este prototipo utiliza almacenamiento local únicamente para recordar su preferencia de cookies. No incorpora analítica ni publicidad.',
    cookieAccept: 'Aceptar esenciales',
    cookieReject: 'Continuar sin guardar',
    formSuccessFallback: 'Se abrió su aplicación de correo con la información preparada. Revise el contenido antes de enviarlo.',
    formError: 'No fue posible preparar el envío. Escriba a info@eaglecommercial.com.co.',
    demoNotice: 'Interfaz demostrativa. La autenticación real requiere un backend seguro.',
    seo: {
      home: {
        title: 'Eagle Commercial | Ingeniería e integración tecnológica',
        description: 'Eagle Commercial integra tecnología avanzada para defensa, seguridad, infraestructura crítica y organizaciones con operaciones exigentes.'
      },
      company: {
        title: 'Compañía | Eagle Commercial',
        description: 'Conozca el enfoque de ingeniería, integración, despliegue y soporte de Eagle Commercial S.A. en Colombia.'
      },
      capabilities: {
        title: 'Capacidades tecnológicas | Eagle Commercial',
        description: 'Capacidades generales de comunicaciones, monitoreo, sistemas autónomos, seguridad electrónica, infraestructura y soporte.'
      },
      sectors: {
        title: 'Sectores | Eagle Commercial',
        description: 'Tecnología para defensa, gobierno, infraestructura crítica, energía, transporte, industria, seguridad corporativa y emergencias.'
      },
      engineering: {
        title: 'Ingeniería e integración | Eagle Commercial',
        description: 'Metodología para comprender requerimientos, diseñar arquitecturas, integrar, desplegar, capacitar y soportar soluciones.'
      },
      support: {
        title: 'Soporte y ciclo de vida | Eagle Commercial',
        description: 'Acompañamiento técnico, capacitación, mantenimiento, garantías y evolución de capacidades tecnológicas.'
      },
      group: {
        title: 'Eagle Group | Eagle Commercial',
        description: 'Ecosistema de ingeniería, logística, almacenamiento, aduanas y comercio exterior para proyectos tecnológicos.'
      },
      contact: {
        title: 'Contacto | Eagle Commercial',
        description: 'Converse con el equipo de Eagle Commercial sobre una necesidad, proyecto, soporte o alianza tecnológica.'
      },
      access: {
        title: 'Área autorizada | Eagle Commercial',
        description: 'Interfaz demostrativa para acceso controlado a información técnica reservada.'
      },
      privacy: {
        title: 'Privacidad y cookies | Eagle Commercial',
        description: 'Borrador de política de privacidad y cookies para revisión jurídica.'
      },
      data: {
        title: 'Tratamiento de datos | Eagle Commercial',
        description: 'Aviso de privacidad y tratamiento de datos personales de Eagle Commercial S.A.'
      }
    }
  },
  en: {
    languageName: 'English',
    alternateLanguage: 'ES',
    skip: 'Skip to content',
    navCta: 'Talk to a specialist',
    access: 'Authorized access',
    explore: 'Explore capability',
    learnMore: 'Learn more',
    viewAll: 'View all capabilities',
    requestInfo: 'Request information',
    contactSpecialist: 'Contact a specialist',
    legalDraft: 'Draft pending legal approval. Do not publish without review.',
    sensitiveWarning: 'Do not include classified, restricted, technical or operationally sensitive information in public forms.',
    footerStatement: 'Technology engineering and integration for organizations operating in critical environments.',
    copyright: 'All rights reserved.',
    cookieText: 'This prototype uses local storage only to remember your cookie preference. It includes no analytics or advertising.',
    cookieAccept: 'Accept essentials',
    cookieReject: 'Continue without saving',
    formSuccessFallback: 'Your email application was opened with the information prepared. Review it before sending.',
    formError: 'The message could not be prepared. Please write to info@eaglecommercial.com.co.',
    demoNotice: 'Demonstration interface. Real authentication requires a secure backend.',
    seo: {
      home: {
        title: 'Eagle Commercial | Technology engineering and integration',
        description: 'Eagle Commercial integrates advanced technology for defense, security, critical infrastructure and organizations with demanding operations.'
      },
      company: {
        title: 'Company | Eagle Commercial',
        description: 'Learn about Eagle Commercial S.A.’s engineering, integration, deployment and support approach in Colombia.'
      },
      capabilities: {
        title: 'Technology capabilities | Eagle Commercial',
        description: 'General capabilities in communications, monitoring, autonomous systems, electronic security, infrastructure and support.'
      },
      sectors: {
        title: 'Sectors | Eagle Commercial',
        description: 'Technology for defense, government, critical infrastructure, energy, transport, industry, corporate security and emergencies.'
      },
      engineering: {
        title: 'Engineering and integration | Eagle Commercial',
        description: 'A methodology to understand requirements, design architectures, integrate, deploy, train and support solutions.'
      },
      support: {
        title: 'Support and lifecycle | Eagle Commercial',
        description: 'Technical assistance, training, maintenance, warranties and evolution of technology capabilities.'
      },
      group: {
        title: 'Eagle Group | Eagle Commercial',
        description: 'An ecosystem of engineering, logistics, storage, customs and foreign trade for technology projects.'
      },
      contact: {
        title: 'Contact | Eagle Commercial',
        description: 'Talk with Eagle Commercial about a need, project, support request or technology partnership.'
      },
      access: {
        title: 'Authorized access | Eagle Commercial',
        description: 'Demonstration interface for controlled access to restricted technical information.'
      },
      privacy: {
        title: 'Privacy and cookies | Eagle Commercial',
        description: 'Draft privacy and cookie policy pending legal review.'
      },
      data: {
        title: 'Data processing | Eagle Commercial',
        description: 'Privacy notice and personal data processing information for Eagle Commercial S.A.'
      }
    }
  }
};
