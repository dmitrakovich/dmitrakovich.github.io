/**
 * Всё содержимое резюме в одном месте. Тексты — на двух языках: { ru, en }.
 * Чтобы добавить место работы — добавь объект в `experience`;
 * даты в формате 'YYYY-MM', `end: null` — «по настоящее время».
 */

export type Lang = 'ru' | 'en';
export type L<T = string> = Record<Lang, T>;

export interface Role {
  title: string;
  start: string;
  end: string | null;
  location?: L;
  summary?: L;
  highlights: L<string[]>;
  stack: string[];
}

export interface Company {
  name: L;
  note?: L;
  format: L;
  roles: Role[];
}

export const profile = {
  name: { ru: 'Андрей Дмитракович', en: 'Andrey Dmitrakovich' } as L,
  firstName: { ru: 'Андрей', en: 'Andrey' } as L,
  lastName: { ru: 'Дмитракович', en: 'Dmitrakovich' } as L,
  role: 'Software Engineering Team Lead',
  current: { ru: 'Team Lead в «Европочте»', en: 'Team Lead at Evropochta' } as L,
  location: { ru: 'Минск, Беларусь', en: 'Minsk, Belarus' } as L,
  careerStart: '2018-07',
  leadStart: '2025-08',
  photo: '/avatar.jpg',
  tagline: {
    ru: 'Строю надёжный бэкенд на PHP и Laravel — и команду, которая его развивает.',
    en: 'I build reliable PHP & Laravel backends — and the team that keeps them growing.',
  } as L,
  rotating: {
    ru: ['Team Lead', 'PHP · Laravel', 'архитектура бэкенда', 'интеграции и API', 'ИИ в разработке'],
    en: ['Team Lead', 'PHP · Laravel', 'backend architecture', 'integrations & APIs', 'AI in engineering'],
  } as L<string[]>,
  links: {
    linkedin: 'https://www.linkedin.com/in/andrey-dmitrakovich/',
    github: 'https://github.com/dmitrakovich',
    recommendations: 'https://www.linkedin.com/in/andrey-dmitrakovich/details/recommendations/',
  },
};

export const about: L<string[]> = {
  ru: [
    'Бэкенд-разработчик с 2018 года, тимлид — с 2025-го. Мой путь: интернет-магазин, который я переписал с нуля на Laravel, SaaS-приложения для Shopify и серверная часть почтового оператора «Европочта».',
    'Сейчас руковожу бэкенд-командой «Европочты» и отвечаю за архитектуру, качество кода и стабильность продакшена — от них зависят отделения, сайт, мобильное приложение сотрудников и партнёрские интеграции. Мне важен не только технический результат, но и реальная польза для бизнеса, поэтому я всегда ищу, как сделать процессы быстрее и удобнее для всех.',
  ],
  en: [
    'Backend engineer since 2018 and team lead since 2025. My path runs from an online store I rebuilt from scratch on Laravel, through SaaS apps for Shopify, to the server side of Evropochta, a postal operator.',
    'Today I lead the Evropochta backend team and own architecture, code quality and production stability for the systems behind post offices, the website, the staff mobile app and partner integrations. I care about real business outcomes as much as clean code, so I keep looking for ways to make processes faster and simpler for everyone.',
  ],
};

export const strengths: { icon: string; title: L; text: L }[] = [
  {
    icon: 'layers',
    title: { ru: 'Архитектура', en: 'Architecture' },
    text: {
      ru: 'Проектирую сервисы на PHP и Laravel, которые выдерживают рост нагрузки и легко развиваются.',
      en: 'PHP & Laravel services designed to handle growing load and stay easy to evolve.',
    },
  },
  {
    icon: 'plug',
    title: { ru: 'Интеграции', en: 'Integrations' },
    text: {
      ru: 'REST, GraphQL и WebSocket: оплаты и доставка, программная касса, налоговая, партнёрские API.',
      en: 'REST, GraphQL and WebSocket: payments and delivery, a software cash register, tax reporting, partner APIs.',
    },
  },
  {
    icon: 'refresh',
    title: { ru: 'Легаси → новый стек', en: 'Legacy → modern' },
    text: {
      ru: 'Перевожу бизнес с устаревших систем (MSSQL, Delphi, CakePHP) на современный стек без остановки процессов.',
      en: 'Moving business off legacy systems (MSSQL, Delphi, CakePHP) to a modern stack without stopping operations.',
    },
  },
  {
    icon: 'gauge',
    title: { ru: 'Производительность', en: 'Performance' },
    text: {
      ru: 'Индексы и запросы, очереди, Redis и Horizon, кэширование и фоновые воркеры.',
      en: 'Indexes and queries, queues, Redis and Horizon, caching and background workers.',
    },
  },
  {
    icon: 'branch',
    title: { ru: 'CI/CD и инфраструктура', en: 'CI/CD & infrastructure' },
    text: {
      ru: 'GitLab CI и Bitbucket Pipelines, Docker, стейдж-окружения, S3, ClickHouse, ELK.',
      en: 'GitLab CI and Bitbucket Pipelines, Docker, staging environments, S3, ClickHouse, ELK.',
    },
  },
  {
    icon: 'activity',
    title: { ru: 'Надёжность', en: 'Reliability' },
    text: {
      ru: 'Мониторинг и логирование бизнес-процессов, разбор инцидентов и постмортемы.',
      en: 'Monitoring and logging of business processes, incident analysis and postmortems.',
    },
  },
  {
    icon: 'sparkles',
    title: { ru: 'ИИ в разработке', en: 'AI in engineering' },
    text: {
      ru: 'ИИ-ревью кода и MCP-интеграции с GitLab, Jira и Confluence — ими пользуются и другие команды.',
      en: 'AI code review and MCP integrations with GitLab, Jira and Confluence, now used by other teams too.',
    },
  },
  {
    icon: 'users',
    title: { ru: 'Команда', en: 'Leadership' },
    text: {
      ru: 'Процессы, код-ревью и стандарты, менторинг и рост каждого разработчика.',
      en: 'Processes, code review and standards, mentoring and growing every developer.',
    },
  },
];

export const experience: Company[] = [
  {
    name: { ru: 'ИМЕ', en: 'IME' },
    note: { ru: 'emall · edostavka · Европочта', en: 'emall · edostavka · Evropochta' },
    format: { ru: 'Полная занятость · гибрид', en: 'Full-time · Hybrid' },
    roles: [
      {
        title: 'Software Engineering Team Lead',
        start: '2025-08',
        end: null,
        location: { ru: 'Минск', en: 'Minsk' },
        summary: {
          ru: 'Руковожу командой бэкенд-разработки проекта «Европочта»: серверная часть для отделений, сайта, мобильного приложения сотрудников и интеграций с партнёрами.',
          en: 'Leading the Evropochta backend team: the server side behind post offices, the website, the staff mobile app and partner integrations.',
        },
        highlights: {
          ru: [
            'Проектирую архитектуру и технические решения, вместе с аналитиками и PM оцениваю и планирую задачи.',
            'Внедряю новые технологии и инфраструктуру: ClickHouse, ELK, S3, стейдж-окружение, мониторинг очередей.',
            'Внедряю ИИ в разработку: ИИ-ревью кода, MCP-интеграции с GitLab, Jira и Confluence.',
            'Отвечаю за качество кода и стабильность продакшена: code review, стандарты, мониторинг, разбор инцидентов и постмортемы.',
            'Разрабатываю и поддерживаю API для внешних интеграций.',
            'Оптимизирую производительность и работу с БД: индексы, очереди, Redis, Horizon.',
            'Планирую техническое развитие и roadmap, взаимодействую со смежными командами, DevOps и бизнесом.',
            'Руковожу командой: выстраиваю процессы, менторю, помогаю разработчикам расти.',
          ],
          en: [
            'Design the architecture and technical solutions; estimate and plan work together with analysts and PMs.',
            'Introduce new technology and infrastructure: ClickHouse, ELK, S3, a staging environment, queue monitoring.',
            'Bring AI into engineering: AI code review and MCP integrations with GitLab, Jira and Confluence.',
            'Own code quality and production stability: code review, standards, monitoring, incident analysis and postmortems.',
            'Build and maintain APIs for external integrations.',
            'Tune performance and database work: indexes, queues, Redis, Horizon.',
            'Plan technical development and the roadmap; work with neighbouring teams, DevOps and business stakeholders.',
            'Lead the team: set up processes, mentor and grow developers.',
          ],
        },
        stack: ['Laravel', 'Filament', 'Redis', 'Horizon', 'ClickHouse', 'ELK', 'S3', 'GitLab CI', 'MCP'],
      },
      {
        title: 'Software Engineer',
        start: '2023-12',
        end: '2025-08',
        location: { ru: 'Минск', en: 'Minsk' },
        highlights: {
          ru: [
            'Разрабатывал веб-интерфейс для сотрудников почтовых отделений.',
            'Интегрировал программную кассу через WebSocket для оплаты посылок, товаров и услуг.',
            'Сделал бэкенд кассы «Шеф-Онлайн»: каталог, сохранение заказов с чеками.',
            'Вёл поэтапный переход с легаси-системы на современный веб-интерфейс, чтобы полностью отказаться от старого ПО.',
            'Настроил периодическую синхронизацию с легаси-системой на MSSQL, чтобы бизнес-процессы не прерывались.',
            'Реализовал маршрутизацию и консолидацию посылок.',
            'Создавал и развивал админ-панель на Filament.',
            'Настроил мониторинг и логирование всех этапов бизнес-процессов для быстрого реагирования на инциденты.',
            'Проводил код-ревью, оценивал и планировал задачи.',
          ],
          en: [
            'Built the web interface used by post office staff.',
            'Integrated a software cash register over WebSocket to pay for parcels, goods and services.',
            'Built the backend for the “Shef-Online” POS: catalogue, orders and receipts.',
            'Drove a step-by-step migration from the legacy system to a modern web interface, aiming to retire the old software.',
            'Set up periodic sync with the legacy MSSQL system so business processes never stopped.',
            'Implemented parcel routing and consolidation.',
            'Created and extended the Filament admin panel.',
            'Set up monitoring and logging across every stage of the business processes for fast incident response.',
            'Reviewed code; estimated and planned work.',
          ],
        },
        stack: ['Laravel', 'Filament', 'WebSocket', 'MSSQL', 'MySQL', 'Redis', 'Docker'],
      },
    ],
  },
  {
    name: { ru: 'SpurIT eCommerce Solutions', en: 'SpurIT eCommerce Solutions' },
    note: { ru: 'SaaS-приложения для Shopify', en: 'SaaS apps for Shopify' },
    format: { ru: 'Полная занятость · гибрид', en: 'Full-time · Hybrid' },
    roles: [
      {
        title: 'Full Stack Developer',
        start: '2021-04',
        end: '2023-12',
        highlights: {
          ru: [
            'Разрабатывал встроенные SaaS-приложения для Shopify; переписывал приложения с CakePHP на Laravel и настраивал их деплой.',
            'Интегрировал сторонние сервисы через REST API и GraphQL.',
            'Оптимизировал приложения по Core Web Vitals: LCP, CLS, FID.',
            'Настраивал и поддерживал CI/CD на Bitbucket Pipelines.',
            'Писал и дорабатывал библиотеки для приложений.',
            'Использовал Sentry, чтобы быстро находить и устранять проблемы.',
            'Писал внутренние сервисы для настройки и мониторинга приложений.',
          ],
          en: [
            'Built and extended embedded SaaS apps for Shopify; rewrote apps from CakePHP to Laravel and set up their deployment.',
            'Integrated third-party services via REST and GraphQL APIs.',
            'Optimized apps for Core Web Vitals: LCP, CLS, FID.',
            'Set up and maintained CI/CD on Bitbucket Pipelines.',
            'Wrote and extended shared libraries for the apps.',
            'Used Sentry to catch and fix production issues fast.',
            'Wrote internal services for configuring and monitoring the apps.',
          ],
        },
        stack: ['Laravel', 'CakePHP', 'Shopify', 'GraphQL', 'JavaScript', 'Bitbucket Pipelines', 'Sentry'],
      },
    ],
  },
  {
    name: { ru: 'ramonki', en: 'ramonki' },
    note: { ru: 'интернет-магазин одежды', en: 'fashion e-commerce' },
    format: { ru: 'Полная занятость · офис', en: 'Full-time · On-site' },
    roles: [
      {
        title: 'PHP Web Developer',
        start: '2018-07',
        end: '2021-04',
        location: { ru: 'Брест', en: 'Brest' },
        highlights: {
          ru: [
            'Переписал сайт интернет-магазина с нуля на Laravel, поддерживал и развивал функциональность.',
            'Подключил службы доставки (СДЭК, DPD, GloBel24, Белпочта, Boxberry) и онлайн-оплату через API.',
            'Сделал админки: для контента сайта, для взаимодействия между отделами, для отзывов.',
            'Настроил обмен с внутренней CRM на Delphi: импорт заказов и выгрузку товаров на сайт.',
            'Написал бота для соцсетей и выгрузку товаров в соцсети.',
            'Кэширование, фоновые воркеры, настройка серверов, интеграция с Firebase.',
          ],
          en: [
            'Rebuilt the online store from scratch on Laravel; maintained and extended its features.',
            'Connected delivery services (CDEK, DPD, GloBel24, Belpost, Boxberry) and online payments via their APIs.',
            'Built admin panels for site content, cross-department workflows and customer reviews.',
            'Set up data exchange with the in-house Delphi CRM: order import and product export to the site.',
            'Wrote a social media bot and product export to social networks.',
            'Caching, background workers, server setup, Firebase integration.',
          ],
        },
        stack: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Firebase', 'JavaScript'],
      },
    ],
  },
];

export const skills: { title: L; items: string[] }[] = [
  {
    title: { ru: 'Бэкенд', en: 'Backend' },
    items: ['PHP', 'Laravel', 'Filament', 'REST API', 'GraphQL', 'WebSocket', 'Horizon', 'RabbitMQ'],
  },
  {
    title: { ru: 'Данные', en: 'Data' },
    items: ['MySQL', 'MSSQL', 'Redis', 'ClickHouse', 'S3', 'Firebase'],
  },
  {
    title: { ru: 'DevOps и наблюдаемость', en: 'DevOps & observability' },
    items: ['Docker', 'GitLab CI', 'Bitbucket Pipelines', 'ELK', 'Sentry', 'Pulse', 'Zabbix'],
  },
  {
    title: { ru: 'Фронтенд', en: 'Frontend' },
    items: ['JavaScript', 'React', 'HTML / CSS', 'Bootstrap', 'Shopify'],
  },
  {
    title: { ru: 'Процессы и ИИ', en: 'Process & AI' },
    items: ['Scrum', 'Code review', 'Jira', 'Confluence', 'AI code review', 'MCP'],
  },
];

export const marquee = [
  'PHP', 'Laravel', 'Filament', 'Redis', 'Horizon', 'ClickHouse', 'MySQL', 'MSSQL', 'RabbitMQ',
  'Docker', 'GitLab CI', 'ELK', 'Sentry', 'S3', 'GraphQL', 'WebSocket', 'REST API', 'MCP',
];

export const projects: { name: string; href: string; lang: string; tags: string[]; text: L }[] = [
  {
    name: 'smstraffic-for-laravel',
    href: 'https://github.com/dmitrakovich/smstraffic-for-laravel',
    lang: 'PHP',
    tags: ['Laravel', 'Notifications', 'Composer'],
    text: {
      ru: 'Канал уведомлений «Smart Traffic» и клиент «Smart Delivery» для Laravel: SMS прямо из Notification-классов.',
      en: '“Smart Traffic” notification channel and “Smart Delivery” client for Laravel: SMS straight from Notification classes.',
    },
  },
  {
    name: 'sxgeo',
    href: 'https://github.com/dmitrakovich/sxgeo',
    lang: 'PHP',
    tags: ['Laravel', 'GeoIP', 'Composer'],
    text: {
      ru: 'GeoIP для Laravel на базе SypexGeo: определение города и страны по IP из локальной базы или API сервиса.',
      en: 'GeoIP for Laravel powered by SypexGeo: city and country by IP from a local database or the service API.',
    },
  },
  {
    name: 'abit.polessu.by',
    href: 'https://github.com/dmitrakovich/abit.polessu.by',
    lang: 'PHP',
    tags: ['Diploma', 'Web app'],
    text: {
      ru: 'Дипломный проект: автоматизированная регистрация абитуриентов Полесского государственного университета.',
      en: 'Diploma project: automated applicant registration for Polessky State University.',
    },
  },
];

export const recommendation = {
  quote: {
    ru: '…обладает высоким потенциалом и быстро осваивает новые знания и технологии.',
    en: '…possessed high potential and could rapidly assimilate new knowledge and technologies.',
  } as L,
  author: 'Tatsiana Siarhei',
  role: {
    ru: 'руководила командой в SpurIT, была моим прямым руководителем',
    en: 'led the team at SpurIT, managed Andrey directly',
  } as L,
  points: {
    ru: ['Сильные PHP и JavaScript', 'Быстро освоил Shopify', 'Внимателен к фидбеку на ревью', 'Сделал команду сплочённее'],
    en: ['Strong PHP & JavaScript', 'Mastered Shopify fast', 'Careful with review feedback', 'Made the team more cohesive'],
  } as L<string[]>,
};

export const education = {
  school: { ru: 'Полесский государственный университет', en: 'Polessky State University' } as L,
  degree: { ru: 'Бакалавр, информационные технологии', en: "Bachelor's degree, Information Technology" } as L,
  city: { ru: 'Пинск', en: 'Pinsk' } as L,
  start: '2014-09',
  end: '2018-07',
};
