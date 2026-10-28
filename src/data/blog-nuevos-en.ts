import type { Post } from './blog-posts';
import { cierre, nota } from './blog-nuevos-comun';

const AUTOR = 'Jaime Tarazona';

// Mismo orden que blog-nuevos-es.ts: el blog empareja es/en por posicion.
export const postsNuevosEn: Post[] = [
  {
    slug: 'how-much-does-website-cost-peru',
    title: 'How much does a website cost in Peru: prices and what is included (2026)',
    description: 'A custom website at DEVMARK starts from S/ 800 (about US$ 235). See what drives the price of a website in Peru, the ranges seen in the market and how to compare quotes.',
    date: '2026-10-27',
    author: AUTOR,
    image: '/illustrations/programming.svg',
    imageHint: 'website prices in Peru',
    tags: ['Websites', 'Pricing', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> at DEVMARK a custom website starts from <strong>S/ 800</strong> (about US$ 235, 1 to 3 pages) and a corporate site of up to 8 pages from <strong>S/ 2500</strong> (about US$ 735). In the Peruvian market you see anything from a few hundred soles for very simple sites to several thousand for corporate ones, and a lot more for custom platforms. The final amount depends on scope, complexity and deadlines.</p>
        <h2>Website prices in Peru by type</h2>
        <table><thead><tr><th>Website type</th><th>From at DEVMARK</th><th>Indicative market range</th><th>Who it is for</th></tr></thead><tbody>
        <tr><td>Basic site (1 to 3 pages)</td><td>S/ 800</td><td>From about S/ 500 to around S/ 1500</td><td>Those starting out who need a presence and a contact form</td></tr>
        <tr><td>Corporate site (up to 8 pages, blog)</td><td>S/ 2500</td><td>Between about S/ 1500 and S/ 5000</td><td>Businesses already selling that want to win clients from Google</td></tr>
        <tr><td>Site with an editable CMS</td><td>S/ 1500</td><td>Between about S/ 1500 and S/ 4000</td><td>Those who want to edit text and photos without asking for help</td></tr>
        <tr><td>Custom platform or store</td><td>Custom quote</td><td>From several thousand soles, with no clear ceiling</td><td>Bookings, payments, dashboards, integrations</td></tr>
        </tbody></table>
        ${nota('en', true)}
        <h2>What pushes the price up or down</h2>
        <ul>
          <li><strong>Pages and sections:</strong> more pages mean more design and more content to prepare.</li>
          <li><strong>Custom design or template:</strong> a custom design takes more hours than adapting a template.</li>
          <li><strong>Features:</strong> payments, bookings, private areas, integration with your CRM or WhatsApp.</li>
          <li><strong>Content management:</strong> if you want to edit it yourself you need a CMS or a panel.</li>
          <li><strong>Baseline SEO:</strong> clean URLs, speed, metadata and structured data. Ask whether it is included.</li>
          <li><strong>Deadlines:</strong> urgency usually costs more because it displaces other work.</li>
        </ul>
        <h2>What is paid separately, every year or every month</h2>
        <p>A website quote rarely covers everything. Check these items: <a href="/en/blog/how-much-does-hosting-cost-peru">hosting and domain</a>, <a href="/en/blog/how-much-does-website-maintenance-cost-peru">monthly maintenance</a>, <a href="/en/blog/how-much-does-monthly-seo-cost-peru">SEO</a> if you want to be found, and paid plugins or licenses if your site uses them.</p>
        <h2>How to compare quotes without getting lost</h2>
        <ol>
          <li>Ask each proposal to list pages, features and deliverables. If it only says “professional website”, it cannot be compared.</li>
          <li>Ask who owns the domain, the hosting and the code at the end.</li>
          <li>Confirm whether the amount includes IGV (Peru's sales tax) and what happens at renewal.</li>
          <li>Ask who supports you after delivery and what that support costs.</li>
          <li>Look at past work in the <a href="/en/portfolio">portfolio</a> and talk to whoever will design your project, not only to the person selling it.</li>
        </ol>
        <h2>Frequently asked questions</h2>
        <h3>How much does a landing page cost in Peru?</h3>
        <p>A basic site of 1 to 3 pages starts from S/ 800 at DEVMARK. In the market you see offers from a few hundred soles, but check what each one includes.</p>
        <h3>Does the website include hosting and a domain?</h3>
        <p>It depends on the quote. Ask for it in writing. We are Hostinger partners and the code DEVMARKPE gets you a discount.</p>
        <h3>Is a template or a custom site better?</h3>
        <p>A template works to start fast on a small budget. A custom site fits when you need to stand out, need speed or need your own features.</p>
        <h3>Can I see an exact price before writing to you?</h3>
        <p>As a reference, yes: the “from” prices are above. For your case, the AI quote tool gives you a PDF proposal right away.</p>
        ${cierre('en', 'web', 'Hi DEVMARK, I read how much a website costs in Peru and I would like a quote for mine.')}
      `,
  },
  {
    slug: 'how-much-does-an-online-store-cost-peru',
    title: 'How much does an online store cost in Peru: build and running costs',
    description: 'A CMS store at DEVMARK starts from S/ 1500 (about US$ 440). What goes into the cost of an online store in Peru, what you pay every month and when a custom one pays off.',
    date: '2026-10-26',
    author: AUTOR,
    image: '/portfolio/ecommerce-global.jpg',
    imageHint: 'online store cost in Peru',
    tags: ['E-commerce', 'Online Store', 'Pricing', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> a store or site with an editable CMS starts from <strong>S/ 1500</strong> at DEVMARK (about US$ 440), and from <strong>S/ 3200</strong> (about US$ 940) if you need more pages, a blog and integrations. A custom store with payments and its own features is quoted per case. On top of that come running costs: payment gateway, hosting, domain and maintenance.</p>
        <h2>Three paths and what they cost</h2>
        <table><thead><tr><th>Path</th><th>Starting cost</th><th>What you pay afterwards</th><th>It fits when…</th></tr></thead><tbody>
        <tr><td>Subscription platform (Shopify, Tiendanube and similar)</td><td>Setup and design; the platform charges monthly</td><td>A monthly subscription that, from what is seen in the market, starts at a few tens of dollars, plus fees</td><td>You want to launch fast and sell a standard catalog</td></tr>
        <tr><td>CMS store (for example WordPress with WooCommerce)</td><td>From S/ 1500 at DEVMARK</td><td>Hosting, maintenance and paid plugins</td><td>You want to control your catalog, content and costs</td></tr>
        <tr><td>Custom store</td><td>Custom quote; in the market it starts at several thousand soles</td><td>Hosting and maintenance</td><td>You have pricing, stock or order rules a template cannot handle</td></tr>
        </tbody></table>
        ${nota('en', true)}
        <h2>What almost nobody adds to the budget</h2>
        <ul>
          <li><strong>Payment gateway:</strong> each one charges its own fee per sale. Ask the provider for the current rate before deciding.</li>
          <li><strong>Photos and product pages:</strong> loading and writing the catalog takes time, or costs money if you delegate it.</li>
          <li><strong>Hosting, domain and SSL certificate:</strong> see the guide on <a href="/en/blog/how-much-does-hosting-cost-peru">how much hosting costs in Peru</a>.</li>
          <li><strong>Maintenance:</strong> a store that is not updated gets slow and vulnerable. See the <a href="/en/blog/how-much-does-website-maintenance-cost-peru">cost of monthly maintenance</a>.</li>
          <li><strong>Logistics:</strong> shipping, packaging and returns.</li>
          <li><strong>Traffic:</strong> a store with no visitors does not sell. Plan for SEO or ads from the first month.</li>
        </ul>
        <h2>How to decide without overspending</h2>
        <p>If you sell a few hundred products or fewer and your catalog is standard, a CMS store is usually enough. Move to a custom one when you have your own rules (prices per customer, quotes, a link to your inventory system). Before committing, define how many products you will have, which payment methods you will accept and how you will ship. With that, any agency can quote you precisely.</p>
        <h2>Frequently asked questions</h2>
        <h3>How much does a basic online store cost in Peru?</h3>
        <p>At DEVMARK a CMS store starts from S/ 1500. The final amount changes with the number of products, integrations and deadlines.</p>
        <h3>Can I accept Yape or cards?</h3>
        <p>Yes, payment gateways can be integrated. Each has its own terms and fees; we go over them with you when quoting.</p>
        <h3>Shopify or WooCommerce?</h3>
        <p>Shopify is quick to launch but depends on a subscription. WooCommerce gives more control in exchange for more maintenance. We decide based on your catalog and budget.</p>
        <h3>Who updates the products?</h3>
        <p>You do, from a simple panel. If you prefer to delegate, it is agreed separately.</p>
        ${cierre('en', 'cms', 'Hi DEVMARK, I read how much an online store costs in Peru and I would like a quote for mine.')}
      `,
  },
  {
    slug: 'how-much-does-monthly-seo-cost-peru',
    title: 'How much does monthly SEO cost in Peru: what each level includes',
    description: 'SEO at DEVMARK starts from S/ 300 a month (about US$ 90). What each level includes, the ranges seen in Lima and how to spot proposals with no real work behind them.',
    date: '2026-10-25',
    author: AUTOR,
    image: '/undraw_web-devices_i15y.svg',
    imageHint: 'monthly SEO price in Peru',
    tags: ['SEO', 'Pricing', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> monthly SEO at DEVMARK starts from <strong>S/ 300 a month</strong> (basic local SEO, about US$ 90), goes to <strong>S/ 600</strong> with content and technical SEO, and to <strong>S/ 1200</strong> for competitive markets, with GEO optimization included. From what is seen in the Peruvian market, agencies serving small businesses in Lima tend to range from a little over S/ 1000 to several thousand soles a month. The difference is in scope, not in a single “right” price.</p>
        <h2>What each level includes at DEVMARK</h2>
        <table><thead><tr><th>Level</th><th>From</th><th>Includes</th></tr></thead><tbody>
        <tr><td>Starter</td><td>S/ 300 a month</td><td>On-page optimization, Google business profile, Search Console setup, basic monthly report</td></tr>
        <tr><td>Business</td><td>S/ 600 a month</td><td>The above, plus keyword research, 2 optimized articles a month, basic technical SEO and basic link building</td></tr>
        <tr><td>Enterprise</td><td>S/ 1200 a month</td><td>The above, plus 4 articles a month, advanced technical SEO, quality link building and GEO optimization</td></tr>
        </tbody></table>
        ${nota('en', true)}
        <h2>Why prices vary so much</h2>
        <ul>
          <li><strong>Competition in your sector:</strong> ranking a clinic or a law firm in Lima is harder than a trade with little online supply.</li>
          <li><strong>Size of your site:</strong> how many pages need optimizing and how much new content is needed.</li>
          <li><strong>Technical state:</strong> a slow or poorly structured site needs a <a href="/en/blog/technical-seo-audit-what-to-check">technical audit</a> before anything else.</li>
          <li><strong>Content and links:</strong> articles and mentions on other sites add hours every month.</li>
          <li><strong>Local or national market:</strong> a business with one location in Lima needs less than one that wants to sell nationwide.</li>
        </ul>
        <h2>Red flags in a proposal</h2>
        <ul>
          <li>It promises first place on Google or an exact date. Nobody controls the algorithm.</li>
          <li>It does not explain what will be done each month or give you a report.</li>
          <li>It asks for full access to your accounts without leaving you as the owner (Search Console, Analytics, Google profile).</li>
          <li>The price is so low it cannot cover real hours of work.</li>
        </ul>
        <h2>How long until it shows</h2>
        <p>SEO is measured in months, not days. The first months usually go to tidying up the technical base and publishing content; the effect on visits and inquiries comes later and depends on your sector. That is why it is better to set simple goals: WhatsApp inquiries, calls and forms, not just rankings.</p>
        <h2>Frequently asked questions</h2>
        <h3>How much does SEO cost for a small business in Lima?</h3>
        <p>At DEVMARK, from S/ 300 a month for basic local SEO. In the market you see offers from a little over S/ 1000 to several thousand soles a month, depending on scope.</p>
        <h3>Does SEO guarantee first place on Google?</h3>
        <p>No. The work aims to improve visibility and inquiries, but no serious provider promises a position.</p>
        <h3>What is GEO and is it included?</h3>
        <p>It means optimizing your site so assistants like ChatGPT, Gemini or Perplexity cite you. It comes in the Enterprise level; we explain it in <a href="/en/blog/what-is-geo-seo-for-ai-appear-in-chatgpt">what GEO is</a>.</p>
        <h3>Is there a minimum contract?</h3>
        <p>We agree on it when quoting, based on scope. Always ask about this before signing with any agency.</p>
        ${cierre('en', 'seo', 'Hi DEVMARK, I read how much monthly SEO costs in Peru and I would like a quote for my business.')}
      `,
  },
  {
    slug: 'how-much-does-website-maintenance-cost-peru',
    title: 'How much does monthly website maintenance cost in Peru',
    description: 'Website maintenance at DEVMARK starts from S/ 60 a month (about US$ 18). What it includes, what it does not, and why a neglected site ends up costing more.',
    date: '2026-10-24',
    author: AUTOR,
    image: '/illustrations/coding.svg',
    imageHint: 'monthly website maintenance in Peru',
    tags: ['Support', 'Maintenance', 'Pricing', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> website maintenance at DEVMARK starts from <strong>S/ 60 a month</strong> (Basic plan, about US$ 18), rises to <strong>S/ 150</strong> with proactive support and to <strong>S/ 300</strong> for critical sites. From what is seen in the Peruvian market, plans range from a few tens of soles for simple sites to several hundred for sites with more moving parts, and higher still for online stores.</p>
        <h2>What each plan includes</h2>
        <table><thead><tr><th>Plan</th><th>From</th><th>Includes</th></tr></thead><tbody>
        <tr><td>Basic</td><td>S/ 60 a month</td><td>Security updates, backups, uptime monitoring, 1 hour of technical support</td></tr>
        <tr><td>Professional</td><td>S/ 150 a month</td><td>The above, plus 4 hours of support, minor content changes, speed optimization and a monthly report</td></tr>
        <tr><td>Enterprise</td><td>S/ 300 a month</td><td>The above, plus 8 hours of support, 24/7 monitoring, immediate response and phone support</td></tr>
        </tbody></table>
        ${nota('en', true)}
        <h2>What maintenance does in practice</h2>
        <ul>
          <li><strong>Updates</strong> the system, themes and plugins before a security flaw exposes them.</li>
          <li><strong>Backs up</strong> your site so it can be restored if something goes wrong.</li>
          <li><strong>Watches</strong> that the site is online and warns you if it goes down.</li>
          <li><strong>Fixes</strong> errors and handles small changes.</li>
          <li><strong>Looks after speed</strong>, which affects sales and rankings. See <a href="/en/blog/slow-website-loses-sales-core-web-vitals">why a slow website loses sales</a>.</li>
        </ul>
        <h2>What it normally does not include</h2>
        <p>Redesigns, new sections, new features, SEO or content campaigns, and paid plugin licenses. Those are quoted separately. Always ask how many support hours are included and what happens if you run over.</p>
        <h2>When it is worth paying for</h2>
        <p>If your site brings inquiries or sales, maintenance pays off. If it is a static page that barely changes, a basic plan may be enough. If you run a store, maintenance matters more, because orders and customer data are involved. An abandoned site piles up pending updates, and the day it fails the repair costs more than looking after it would have.</p>
        <h2>Frequently asked questions</h2>
        <h3>How much does it cost to maintain a website per month in Peru?</h3>
        <p>At DEVMARK, from S/ 60 a month. The final amount depends on the type of site, its complexity and the level of support you need.</p>
        <h3>Can I hire maintenance if another company built my site?</h3>
        <p>Yes. We first review how it is built so we can tell you which plan fits.</p>
        <h3>Is hosting included?</h3>
        <p>Not necessarily. It is quoted separately; see <a href="/en/blog/how-much-does-hosting-cost-peru">how much hosting costs in Peru</a>.</p>
        <h3>What happens if I skip maintenance?</h3>
        <p>Your site keeps working for a while, but it is exposed to security flaws, slowness and errors that pile up.</p>
        ${cierre('en', 'cms', 'Hi DEVMARK, I read how much monthly website maintenance costs and I would like a support plan for my site.', 'support')}
      `,
  },
  {
    slug: 'how-much-does-ai-cost-small-business-peru',
    title: 'How much does it cost to bring AI into a small business in Peru',
    description: 'What using artificial intelligence costs for a small business in Peru: tools, chatbots and automations. DEVMARK starting prices and how to begin without overspending.',
    date: '2026-10-23',
    author: AUTOR,
    image: '/undraw_coding_joxb.svg',
    imageHint: 'cost of implementing artificial intelligence in a small business',
    tags: ['AI', 'Small Business', 'Pricing', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> it depends on what you want the AI to do. A basic WhatsApp chatbot starts from <strong>S/ 500</strong> at DEVMARK (about US$ 150), a chatbot with AI trained on your information from <strong>S/ 2500</strong> (about US$ 735), and automating a process from <strong>S/ 1500</strong> (about US$ 440). From what is seen in the Peruvian market, projects run by consultancies for a single use case range from a few thousand to several tens of thousands of soles. Scope is what changes the amount.</p>
        <h2>Four levels of AI for a small business</h2>
        <table><thead><tr><th>Level</th><th>What it is</th><th>From at DEVMARK</th></tr></thead><tbody>
        <tr><td>1. Ready-made tools</td><td>Subscription AI assistants to write, summarize or analyze</td><td>No development needed; the subscription is the cost</td></tr>
        <tr><td>2. Chatbot</td><td>Answers frequent questions on WhatsApp or your site; with generative AI it uses your information</td><td>S/ 500 (flows) and S/ 2500 (with AI)</td></tr>
        <tr><td>3. Automation</td><td>Connects your tools so data moves on its own</td><td>S/ 1500 for one flow; S/ 3500 for up to 3 flows</td></tr>
        <tr><td>4. AI built into your system</td><td>An assistant connected to your CRM, ERP or orders</td><td>Custom quote</td></tr>
        </tbody></table>
        ${nota('en', true)}
        <h2>Costs that repeat every month</h2>
        <p>AI is not only the initial build. Add what is paid on a recurring basis: the messaging platform (for example WhatsApp Business), the AI model usage, which grows with traffic, and maintenance. Ask for them itemized in the quote so there are no surprises.</p>
        <h2>How to start without overspending</h2>
        <ol>
          <li><strong>Pick one process</strong> that eats time: answering the same questions, capturing leads, entering orders by hand.</li>
          <li><strong>Measure how long it takes today</strong> and how often it happens each month.</li>
          <li><strong>Start with a small version</strong> and expand once you see it works.</li>
          <li><strong>Assign someone</strong> to review the answers and correct the system.</li>
        </ol>
        <p>If you are not sure where to start, a one-off consultation from S/ 30 an hour helps set priorities before spending on development. More ideas in <a href="/en/blog/ai-for-business-how-to-apply-it">AI for business</a> and in <a href="/en/blog/process-automation-smes-peru">process automation for small businesses</a>.</p>
        <h2>Frequently asked questions</h2>
        <h3>How much does AI cost for a small business in Peru?</h3>
        <p>From S/ 500 for a basic chatbot at DEVMARK. A project with custom AI and integrations is quoted by scope.</p>
        <h3>Do I need my own data to use AI?</h3>
        <p>For a useful chatbot, yes: frequent questions, catalog, policies. The better organized that information is, the better it answers.</p>
        <h3>Will AI replace my team?</h3>
        <p>No. It handles the repetitive work and leaves the team the cases that need judgment.</p>
        <h3>How long until it is ready?</h3>
        <p>It depends on scope. A simple chatbot is agreed on short timelines; an integration with your systems takes longer. We set it in the quote.</p>
        ${cierre('en', 'automation', 'Hi DEVMARK, I read how much AI costs for a small business and I would like to evaluate my case.')}
      `,
  },
  {
    slug: 'how-much-does-ai-whatsapp-chatbot-cost-peru',
    title: 'How much does an AI chatbot for WhatsApp cost in Peru',
    description: 'A WhatsApp chatbot at DEVMARK starts from S/ 500 (about US$ 150). What it costs to build one, what you pay monthly and when a platform or a custom build makes sense.',
    date: '2026-10-22',
    author: AUTOR,
    image: '/undraw_coding_joxb.svg',
    imageHint: 'AI chatbot for WhatsApp in Peru',
    tags: ['Chatbots', 'WhatsApp', 'Pricing', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> a WhatsApp chatbot with flows and menus starts from <strong>S/ 500</strong> at DEVMARK (about US$ 150); one with generative AI trained on your information from <strong>S/ 2500</strong> (about US$ 735); and one wired into your CRM or orders is quoted as custom work. On top of that comes a monthly cost for the WhatsApp platform and AI usage.</p>
        <h2>What it costs by chatbot type</h2>
        <table><thead><tr><th>Type</th><th>From at DEVMARK</th><th>What it does</th><th>Indicative market range</th></tr></thead><tbody>
        <tr><td>Flow chatbot</td><td>S/ 500</td><td>Menus and predefined answers on WhatsApp or your site</td><td>Basic setup from almost nothing to a few hundred dollars with no-code platforms</td></tr>
        <tr><td>AI chatbot</td><td>S/ 2500</td><td>Answers in natural language using your information, with a conversation panel</td><td>With integrations, from a few thousand dollars</td></tr>
        <tr><td>Integrated assistant</td><td>Custom quote</td><td>Connected to your CRM or ERP; takes orders and supports sales</td><td>Larger projects, depending on the systems it connects</td></tr>
        </tbody></table>
        ${nota('en', true)}
        <h2>What you pay every month</h2>
        <ul>
          <li><strong>WhatsApp Business API:</strong> to run a chatbot officially you need the WhatsApp API, and Meta charges depending on the message type. Rates change; confirm the current one.</li>
          <li><strong>Chatbot platform:</strong> if you use a subscription one, from what is seen in the market it ranges from a few tens of dollars to a few hundred a month, depending on conversation volume.</li>
          <li><strong>AI model:</strong> usage grows with the number of conversations.</li>
          <li><strong>Maintenance:</strong> adjusting answers, updating prices and reviewing badly answered cases.</li>
        </ul>
        <h2>Platform or custom build</h2>
        <p>A subscription platform works if you only need to answer frequent questions. If your bot has to read stock, order status or billing in real time, we are talking about a custom build. At DEVMARK we train the chatbot on your information, define what it can and cannot answer, and hand over to a person when needed.</p>
        <h2>What a good sales chatbot needs</h2>
        <ol>
          <li>It answers in your tone and only with verified information.</li>
          <li>It knows how to say “I don't have that information” and passes the chat to a person.</li>
          <li>It captures the customer's name and need before handing over.</li>
          <li>It logs conversations so you can improve it.</li>
        </ol>
        <p>For the bigger picture, read <a href="/en/blog/ai-chatbots-customer-service-peru">AI chatbots for customer service</a>.</p>
        <h2>Frequently asked questions</h2>
        <h3>How much does a WhatsApp chatbot cost in Peru?</h3>
        <p>From S/ 500 at DEVMARK. With AI trained on your information, from S/ 2500. The WhatsApp platform is separate.</p>
        <h3>Does it work with my current number?</h3>
        <p>It depends on how your WhatsApp is set up. We check it at the start.</p>
        <h3>Can the chatbot make mistakes?</h3>
        <p>Yes, which is why it is limited to your information and hands over to a person when unsure. It needs regular review.</p>
        <h3>Can it take orders or book appointments?</h3>
        <p>Yes, with integration to your system. That case is quoted as custom work.</p>
        ${cierre('en', 'chatbot', 'Hi DEVMARK, I read how much an AI chatbot for WhatsApp costs and I would like a quote for mine.')}
      `,
  },
  {
    slug: 'how-much-does-hosting-cost-peru',
    title: 'How much does hosting cost in Peru: hosting, domain and email',
    description: 'What you pay for hosting and a domain in Peru: shared hosting, VPS, .pe and .com domains. What to check before buying and how to avoid renewal surprises.',
    date: '2026-10-21',
    author: AUTOR,
    image: '/illustrations/programming.svg',
    imageHint: 'hosting and domain costs in Peru',
    tags: ['Hosting', 'Domain', 'Pricing', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> from what is seen in the Peruvian market, shared hosting for a business site runs about <strong>S/ 30 to S/ 50 a month</strong>, and a .pe domain about <strong>S/ 110 to S/ 180 a year</strong>. VPS plans cost several times more. DEVMARK is a direct Hostinger partner: with the code <strong>DEVMARKPE</strong> you get a discount and we set up your email and SSL certificate for free.</p>
        <h2>Indicative prices</h2>
        <table><thead><tr><th>Item</th><th>Indicative range</th><th>Notes</th></tr></thead><tbody>
        <tr><td>Shared hosting</td><td>About S/ 30 to S/ 50 a month</td><td>Yearly deals can be lower, with renewal at a different price</td></tr>
        <tr><td>.pe domain</td><td>About S/ 110 to S/ 180 a year</td><td>Check the renewal price with NIC.PE or your provider</td></tr>
        <tr><td>.com domain</td><td>About S/ 40 to S/ 60 a year</td><td>Often differs between the first year and renewal</td></tr>
        <tr><td>SSL certificate</td><td>Free on most plans</td><td>Check that it is included</td></tr>
        <tr><td>Email on your domain</td><td>Included or per account</td><td>Ask how many accounts are covered</td></tr>
        <tr><td>VPS or your own server</td><td>Several times shared hosting</td><td>Only if your project requires it</td></tr>
        </tbody></table>
        ${nota('en', true)}
        <h2>Shared, VPS or managed</h2>
        <ul>
          <li><strong>Shared:</strong> you share the server with other sites. Enough for a corporate site or a blog with moderate traffic.</li>
          <li><strong>VPS:</strong> your own resources and more control, but you (or your provider) administer the server. It suits apps, large stores or custom systems.</li>
          <li><strong>Managed:</strong> the provider handles updates and security. It costs more and saves technical work.</li>
        </ul>
        <h2>What to check before buying</h2>
        <ol>
          <li><strong>Renewal price:</strong> the first-year price may be promotional.</li>
          <li><strong>Backups:</strong> how often, and whether you can restore them yourself.</li>
          <li><strong>Speed and stability:</strong> what you notice most when using the site. See <a href="/en/blog/slow-website-loses-sales-core-web-vitals">why a slow website loses sales</a>.</li>
          <li><strong>Support</strong> in your language and its hours.</li>
          <li><strong>Ownership:</strong> the domain should be in your name, not the agency's.</li>
        </ol>
        <p>See our plans and discounts on the <a href="/en/hosting">hosting page</a>. If you also need to keep the site up to date, check <a href="/en/blog/how-much-does-website-maintenance-cost-peru">monthly maintenance</a>.</p>
        <h2>Frequently asked questions</h2>
        <h3>How much does hosting cost in Peru?</h3>
        <p>From what is seen in the market, shared hosting runs about S/ 30 to S/ 50 a month, though cheaper yearly deals exist.</p>
        <h3>How much does a .pe domain cost?</h3>
        <p>About S/ 110 to S/ 180 a year depending on the provider. Confirm the renewal price.</p>
        <h3>Does the server need to be in Peru?</h3>
        <p>For most business sites what matters is that it is fast and stable. For special cases we evaluate it with you.</p>
        <h3>Can I move my site without losing it?</h3>
        <p>Yes. We migrate your site and domain carefully to avoid downtime.</p>
        ${cierre('en', 'web', 'Hi DEVMARK, I read how much hosting costs in Peru and I would like help with my hosting and domain.')}
      `,
  },
  {
    slug: 'freelancer-or-agency-web-development-cost-peru',
    title: 'Freelancer or agency for web development in Peru: what each one charges',
    description: 'We compare what a freelance developer charges versus an agency in Peru, what each option includes and when one or the other fits your project.',
    date: '2026-10-20',
    author: AUTOR,
    image: '/undraw_team-up_qeem.svg',
    imageHint: 'freelancer or agency for web development',
    tags: ['Web Development', 'Pricing', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> from what is seen in the market, a freelance developer in Peru charges around <strong>US$ 20 an hour</strong> on average, and an agency charges more per project because the price covers management, design, testing and support. At DEVMARK a website starts from S/ 800 and consulting from S/ 30 an hour. Whether something is cheap or expensive depends on what each proposal includes.</p>
        <h2>An honest comparison</h2>
        <table><thead><tr><th>Criterion</th><th>Freelancer</th><th>Agency or team</th></tr></thead><tbody>
        <tr><td>Price</td><td>Usually lower, especially on small jobs</td><td>Higher, because it covers several profiles and management</td></tr>
        <tr><td>Who works on it</td><td>One person doing everything</td><td>Design, development and testing shared out</td></tr>
        <tr><td>Availability</td><td>Depends on their schedule and on them not falling ill or leaving</td><td>Work continues if someone is out</td></tr>
        <tr><td>Scope</td><td>Ideal for a clear, bounded task</td><td>Better for projects with several pieces</td></tr>
        <tr><td>Support afterwards</td><td>Agreed with the person</td><td>Maintenance plans are usually available</td></tr>
        <tr><td>Risk</td><td>Wider quality gap between individuals</td><td>Wider gap between large and small agencies</td></tr>
        </tbody></table>
        ${nota('en', true)}
        <h2>When a freelancer fits</h2>
        <p>When you have a concrete task (a tweak, a simple landing page, a one-off integration), a tight budget and the ability to supervise the work. Ask for real examples, check references and agree in writing what is delivered and when.</p>
        <h2>When an agency or a small team fits</h2>
        <p>When the project involves design, development, SEO and support, when the site is key to your sales, or when you do not want to depend on one person. A small team can be a middle ground: at DEVMARK, whoever designs your project is the one who answers your messages.</p>
        <h2>Questions to ask either one</h2>
        <ol>
          <li>What exactly does the price include and what is left out?</li>
          <li>Who owns the code, domain and hosting at the end?</li>
          <li>What happens if I need changes after delivery?</li>
          <li>What are the deadlines and how is progress communicated?</li>
          <li>Do they have published work I can see? Look at our <a href="/en/portfolio">portfolio</a> as an example of what you can ask for.</li>
        </ol>
        <p>If you doubt which way to go, our guide on <a href="/en/blog/how-to-choose-the-right-web-development-agency">how to choose an agency</a> gives you more criteria, and <a href="/en/blog/how-much-does-website-cost-peru">how much a website costs</a> gives you price references.</p>
        <h2>Frequently asked questions</h2>
        <h3>How much does a freelance developer charge in Peru?</h3>
        <p>From what is seen in the market, around US$ 20 an hour on average, though it varies with experience and the type of work.</p>
        <h3>Is an agency always more expensive?</h3>
        <p>Per project it usually is, but it also includes more. Compare what each proposal delivers, not just the amount.</p>
        <h3>Can I start with a freelancer and move to an agency later?</h3>
        <p>Yes, as long as the code is tidy and belongs to you. Ask for access to everything from day one.</p>
        <h3>What if the freelancer disappears?</h3>
        <p>It is the main risk. Clear contracts, shared access and documentation reduce it.</p>
        ${cierre('en', 'consulting', 'Hi DEVMARK, I read the freelancer versus agency comparison and I would like to talk about my project.')}
      `,
  },
  {
    slug: 'what-is-geo-seo-for-ai-appear-in-chatgpt',
    title: 'What is GEO: how to appear in ChatGPT, Gemini and Perplexity answers',
    description: 'GEO is SEO for AI search. What it is, how it overlaps with and differs from SEO, and what you can do on your site so ChatGPT, Gemini and Perplexity cite you.',
    date: '2026-10-27',
    author: AUTOR,
    image: '/undraw_web-devices_i15y.svg',
    imageHint: 'GEO and SEO for AI search engines',
    tags: ['GEO', 'SEO', 'AI', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> GEO (Generative Engine Optimization) is the set of practices that help AI assistants such as ChatGPT, Gemini or Perplexity find your site, understand it and cite it when they answer a question. It builds on SEO but focuses on clear answers, verifiable facts and a consistent identity. There is no guarantee of appearing, but there are signals you can put in order.</p>
        <h2>SEO and GEO: where they overlap and where they do not</h2>
        <table><thead><tr><th></th><th>SEO</th><th>GEO</th></tr></thead><tbody>
        <tr><td>Goal</td><td>Appear in the results list</td><td>Be a cited source inside an answer</td></tr>
        <tr><td>What gets read</td><td>Full pages and their links</td><td>Clear passages that answer a question</td></tr>
        <tr><td>What helps</td><td>Keywords, links, speed</td><td>Direct answers, facts, structure, authorship</td></tr>
        <tr><td>How it is measured</td><td>Rankings and visits</td><td>Whether you are mentioned, and for which queries</td></tr>
        </tbody></table>
        <p>GEO does not replace SEO: a site Google cannot crawl or understand is not a good source for an AI either. That is why it starts with a solid base of <a href="/en/blog/technical-seo-the-foundation-for-good-ranking">technical SEO</a>.</p>
        <h2>What you can do on your site</h2>
        <ol>
          <li><strong>Answer first.</strong> Put the direct answer at the top of each page in two or three sentences, then expand.</li>
          <li><strong>Use real questions as subheadings</strong> with short answers beneath. It is the format that is easiest to cite.</li>
          <li><strong>Give concrete, attributed facts:</strong> “starting from” prices, ranges, definitions. Avoid figures without a source.</li>
          <li><strong>Mark up your content with structured data</strong> (Organization, Article, FAQ, LocalBusiness) so machines understand it without guessing.</li>
          <li><strong>Be consistent:</strong> the same name, address, phone and profiles across your site, Google and social networks.</li>
          <li><strong>Show who is writing:</strong> author, role and real experience.</li>
          <li><strong>Do not block crawlers</strong> by accident. Check your <code>robots.txt</code> and decide which bots you allow.</li>
          <li><strong>Consider an <code>llms.txt</code> file,</strong> a recent convention that summarizes your site for AI assistants. We have ours.</li>
          <li><strong>Earn mentions off your site:</strong> directories, articles, profiles and reviews help you get recognized as an entity.</li>
        </ol>
        <h2>How to tell whether it works</h2>
        <p>Ask ChatGPT, Gemini and Perplexity real questions (“which web development agency do you recommend in Lima?”, “how much does a WhatsApp chatbot cost in Peru?”), note whether you are mentioned and from which page, and repeat every month. Answers change, so look at the trend, not a single day.</p>
        <h2>What not to promise</h2>
        <p>Nobody outside each platform knows the exact formula it uses to decide what to cite. Be wary of anyone who guarantees you will appear in ChatGPT. What can be done is to leave your content clear, verifiable and easy to read for people and machines.</p>
        <h2>Frequently asked questions</h2>
        <h3>What does GEO stand for?</h3>
        <p>Generative Engine Optimization: optimizing for generative search engines, meaning those that answer with AI.</p>
        <h3>Does GEO replace SEO?</h3>
        <p>No. They complement each other; GEO relies on a technically healthy site with good content.</p>
        <h3>How much does GEO cost?</h3>
        <p>At DEVMARK it is part of the SEO and GEO service; GEO optimization is in the Enterprise level, from S/ 1200 a month (about US$ 350). See <a href="/en/blog/how-much-does-monthly-seo-cost-peru">how much monthly SEO costs</a>. Prices are for reference, and the final amount depends on scope, complexity and deadlines.</p>
        <h3>How long until it shows?</h3>
        <p>It is a months-long effort with no guaranteed result. It is measured with periodic test queries.</p>
        ${cierre('en', 'seo', 'Hi DEVMARK, I read what GEO is and I want my business to appear in ChatGPT and other AI assistants.')}
      `,
  },
  {
    slug: 'local-seo-lima-businesses-google-maps',
    title: 'Local SEO in Lima: how to show up on Google Maps and in “near me” searches',
    description: 'Concrete local SEO steps for a business in Lima: Google profile, reviews, consistent data, service pages and how to measure calls and inquiries.',
    date: '2026-10-19',
    author: AUTOR,
    image: '/undraw_web-devices_i15y.svg',
    imageHint: 'local SEO in Lima and Google Maps',
    tags: ['SEO', 'Local SEO', 'Lima', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> to show up on Google Maps and in searches like “dentist near me” in Lima you need three things: a complete, active Google business profile, business details that are identical everywhere, and a website with clear service pages. Local SEO at DEVMARK starts from S/ 300 a month (about US$ 90).</p>
        <h2>The order we follow</h2>
        <ol>
          <li><strong>Google Business Profile.</strong> Claim and verify it. Choose the main category that best describes what you do, fill in hours, services, description and phone, and upload real photos.</li>
          <li><strong>Consistent details.</strong> Name, address and phone must be identical across your site, your Google profile and your social networks. A small difference confuses.</li>
          <li><strong>Real reviews.</strong> Ask real customers after serving them and reply to every one, negative ones included. Do not buy or invent them: it breaks the rules and costs you trust.</li>
          <li><strong>One page per service.</strong> Each key service deserves its own page with useful text, “from” prices if you can, FAQs and contact details.</li>
          <li><strong>Area pages, only if you serve there.</strong> If you have clients in Miraflores, Surco or San Miguel, a page with real information about that area helps. Copying the same text and swapping the district hurts.</li>
          <li><strong>LocalBusiness structured data</strong> on your site, so Google reads your address, hours and phone without doubt.</li>
          <li><strong>Mobile speed.</strong> Most people search from their phone. A slow site loses the inquiry; see <a href="/en/blog/slow-website-loses-sales-core-web-vitals">why a slow website loses sales</a>.</li>
        </ol>
        <h2>What to measure</h2>
        <table><thead><tr><th>Signal</th><th>Where to see it</th></tr></thead><tbody>
        <tr><td>Calls, directions and website clicks from the profile</td><td>Your Google profile stats</td></tr>
        <tr><td>Searches people find you with</td><td>Google Search Console</td></tr>
        <tr><td>WhatsApp clicks</td><td>An event in Google Analytics or the button's counter</td></tr>
        <tr><td>Inquiries received</td><td>Your inbox and WhatsApp, noting where they come from</td></tr>
        </tbody></table>
        <h2>Common mistakes</h2>
        <ul>
          <li>Leaving the profile's holiday hours out of date.</li>
          <li>Using an address that is not real to look closer.</li>
          <li>Stuffing the site with keywords instead of answering questions.</li>
          <li>Not recording where customers come from.</li>
        </ul>
        <p>For a general view of ranking in the country, read <a href="/en/blog/seo-peru-rank-website-google">SEO in Peru: how to rank your website on Google</a>, and for costs, <a href="/en/blog/how-much-does-monthly-seo-cost-peru">how much monthly SEO costs</a>. DEVMARK prices are for reference, and the final amount depends on scope, complexity and deadlines.</p>
        <h2>Frequently asked questions</h2>
        <h3>Do I need a website to appear on Google Maps?</h3>
        <p>It is not mandatory, but a clear site with your services strengthens your profile and gives you more places to appear.</p>
        <h3>How much does local SEO cost?</h3>
        <p>At DEVMARK, from S/ 300 a month. The final amount depends on your competition and scope.</p>
        <h3>How long until it shows?</h3>
        <p>A well-built profile can improve in weeks, and the website in months. It depends on your area and competition.</p>
        <h3>Does it work if I serve other regions of Peru?</h3>
        <p>Yes. The steps are the same; only the service area changes.</p>
        ${cierre('en', 'seo', 'Hi DEVMARK, I read about local SEO in Lima and I want my business to show up on Google Maps.')}
      `,
  },
  {
    slug: 'technical-seo-audit-what-to-check',
    title: 'Technical SEO audit: what to check on your website and how to prioritize',
    description: 'A checklist to audit your site: crawling, indexing, speed, structure, structured data and security. Which tools to use and how to rank what you find.',
    date: '2026-10-18',
    author: AUTOR,
    image: '/illustrations/coding.svg',
    imageHint: 'technical SEO audit of a website',
    tags: ['SEO', 'Technical SEO', 'Peru'],
    content: `
        <p><strong>Short answer:</strong> a technical SEO audit checks whether Google can <em>crawl</em>, <em>understand</em> and <em>index</em> your site, and whether it loads fast and securely. Google's free tools are enough to catch the most serious problems. What matters next is ranking the findings by impact and effort so you fix what weighs most first.</p>
        <h2>What gets checked</h2>
        <table><thead><tr><th>Area</th><th>What to verify</th><th>Where to look</th></tr></thead><tbody>
        <tr><td>Crawling</td><td><code>robots.txt</code> does not block important pages; there is an up-to-date <code>sitemap.xml</code></td><td>Search Console</td></tr>
        <tr><td>Indexing</td><td>Key pages are indexed; no duplicates or junk pages indexed</td><td>Search Console pages report</td></tr>
        <tr><td>Structure and links</td><td>Clear URLs, internal links between related pages, no broken links or redirect chains</td><td>A site crawler</td></tr>
        <tr><td>Metadata</td><td>Unique titles and descriptions, a single H1 per page</td><td>Crawler or manual review</td></tr>
        <tr><td>Speed</td><td>Core Web Vitals in the green, optimized images</td><td>PageSpeed Insights, Lighthouse</td></tr>
        <tr><td>Mobile</td><td>Looks and works well on a phone</td><td>A real test on a phone</td></tr>
        <tr><td>Structured data</td><td>Organization, Article, FAQ or LocalBusiness, no errors</td><td>Google's rich results test</td></tr>
        <tr><td>Security</td><td>Valid HTTPS on every page, no mixed content</td><td>Browser and Search Console</td></tr>
        <tr><td>Languages</td><td>If you have an English version, correct hreflang tags</td><td>Crawler, source code</td></tr>
        </tbody></table>
        <h2>How to prioritize</h2>
        <ol>
          <li><strong>Serious blockers first:</strong> important pages that are not indexed or are blocked.</li>
          <li><strong>Then what affects many pages at once:</strong> speed, structure, templates with repeated metadata.</li>
          <li><strong>Then detail improvements:</strong> structured data, internal links, alt text.</li>
          <li><strong>Last, the cosmetic</strong> that does not change the outcome.</li>
        </ol>
        <p>Note each finding with its page, likely impact and who fixes it. An audit that ends in an 80-page PDF with no priorities is not useful.</p>
        <h2>What the auditor should hand you</h2>
        <ul>
          <li>A prioritized list of problems, with concrete examples.</li>
          <li>What to do in each case, in plain language.</li>
          <li>A staged plan and, if you want, someone to carry it out.</li>
        </ul>
        <p>At DEVMARK we include basic technical SEO in the Business SEO plan and advanced technical SEO in the Enterprise plan; if you prefer a review of just your case, consulting from S/ 30 an hour is a way to start. More fundamentals in <a href="/en/blog/technical-seo-the-foundation-for-good-ranking">technical SEO: the foundation for ranking</a>. Prices are for reference, and the final amount depends on scope, complexity and deadlines.</p>
        <h2>Frequently asked questions</h2>
        <h3>How often should I audit?</h3>
        <p>A full review once a year and a quick one after every big change to the site, such as a redesign or a migration.</p>
        <h3>Can I do it myself?</h3>
        <p>The basics, yes, with Search Console and PageSpeed Insights. The hard part is interpreting and prioritizing.</p>
        <h3>How much does an SEO audit cost?</h3>
        <p>It depends on the size of the site. Send us your web address for a quote and we will reply with the scope.</p>
        <h3>Does the audit improve rankings by itself?</h3>
        <p>No: it puts the base in order. Results come from fixing what it finds and publishing good content.</p>
        ${cierre('en', 'seo', 'Hi DEVMARK, I read about technical SEO audits and I would like you to review my website.')}
      `,
  },
  {
    slug: 'slow-website-loses-sales-core-web-vitals',
    title: 'Why a slow website loses sales and how to measure Core Web Vitals',
    description: 'A slow site frustrates customers and weighs on Google. What Core Web Vitals measure, the recommended values, what makes them worse and how to improve them.',
    date: '2026-10-17',
    author: AUTOR,
    image: '/undraw_device-sync_d9ei.svg',
    imageHint: 'website loading speed and Core Web Vitals',
    tags: ['SEO', 'Performance', 'Web Development'],
    content: `
        <p><strong>Short answer:</strong> a slow website loses sales because people leave before seeing your offer, especially on mobile, and because Google treats page experience as a quality signal. It is measured with three indicators, the Core Web Vitals, and improved with lighter images, less code, good hosting and a well-built site.</p>
        <h2>The three indicators and their recommended values</h2>
        <table><thead><tr><th>Indicator</th><th>What it measures</th><th>Value recommended by Google</th></tr></thead><tbody>
        <tr><td>LCP</td><td>How long the main content of the page takes to show</td><td>2.5 seconds or less</td></tr>
        <tr><td>INP</td><td>How long the page takes to respond to a tap or click</td><td>200 milliseconds or less</td></tr>
        <tr><td>CLS</td><td>How much content shifts while loading</td><td>0.1 or less</td></tr>
        </tbody></table>
        <p>Measure them for free in PageSpeed Insights and in the Core Web Vitals report in Search Console. Test on a real phone over mobile data, not only on your computer.</p>
        <h2>How it turns into lost sales</h2>
        <ul>
          <li><strong>Drop-off before your offer shows:</strong> someone arriving from Google or an ad does not wait.</li>
          <li><strong>Forms and carts that lag:</strong> a button that responds late feels broken.</li>
          <li><strong>Wasted ad spend:</strong> you pay for a click that never sees your page.</li>
          <li><strong>Lower visibility:</strong> page experience is one of the signals Google uses, among many others.</li>
        </ul>
        <h2>What usually makes a site slow</h2>
        <ol>
          <li><strong>Heavy images</strong> that are not compressed or sized.</li>
          <li><strong>Too many plugins or third-party scripts</strong>, such as chats, pixels and maps, all loading at once.</li>
          <li><strong>Overloaded or badly configured hosting</strong>; see <a href="/en/blog/how-much-does-hosting-cost-peru">how much hosting costs in Peru</a>.</li>
          <li><strong>Heavy templates</strong> that load code you do not use.</li>
          <li><strong>Fonts and animations</strong> that are not optimized.</li>
        </ol>
        <h2>How to improve it, in order of impact</h2>
        <ol>
          <li>Compress images and use modern formats such as WebP or AVIF.</li>
          <li>Lazy-load what is below the fold.</li>
          <li>Remove what you do not use: plugins, scripts, extra fonts.</li>
          <li>Use caching and, if your audience is spread out, a content delivery network.</li>
          <li>Review the hosting if server response times are high.</li>
          <li>If the foundation is the problem, a site built with modern technology performs better from the start. That is what we do at DEVMARK with Next.js and React.</li>
        </ol>
        <p>Speed is part of <a href="/en/blog/technical-seo-the-foundation-for-good-ranking">technical SEO</a> and is checked in an <a href="/en/blog/technical-seo-audit-what-to-check">audit</a>. Monthly maintenance helps keep it from degrading over time: <a href="/en/blog/how-much-does-website-maintenance-cost-peru">see what it costs</a>.</p>
        <h2>Frequently asked questions</h2>
        <h3>What counts as a slow website?</h3>
        <p>One that misses the recommended Core Web Vitals values on mobile. As a reference, the main content taking more than 2.5 seconds to show.</p>
        <h3>How much does it cost to speed up my site?</h3>
        <p>It depends on why it is slow. Speed optimization is part of the Professional maintenance plan, from S/ 150 a month (about US$ 44), or it is quoted as a project. Prices are for reference, and the final amount depends on scope, complexity and deadlines.</p>
        <h3>Does a faster site sell more?</h3>
        <p>It removes friction and improves the experience, which helps conversion, though the result depends on your offer and traffic.</p>
        <h3>How do I know if my site is slow?</h3>
        <p>Paste your address into PageSpeed Insights and check the mobile tab.</p>
        ${cierre('en', 'web', 'Hi DEVMARK, my website is slow and I would like you to review it and speed it up.')}
      `,
  },
];
