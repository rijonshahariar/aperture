import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Sustainable Architecture: Building Tomorrow\'s Cities Today',
  description: 'Discover innovative architectural approaches that are reshaping urban landscapes with sustainability at their core, from green skyscrapers to self-sufficient communities.',
  authors: [{ name: 'Marcus Chen' }],
  openGraph: {
    title: 'Sustainable Architecture: Building Tomorrow\'s Cities Today',
    description: 'Discover innovative architectural approaches that are reshaping urban landscapes with sustainability at their core.',
    images: ['https://images.unsplash.com/photo-1565599573128-ae3ef5c9f478?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JlZW4lMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D'],
    type: 'article',
    publishedTime: '2024-11-08',
  },
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function SustainableArchitectureArticle() {
  const post = {
    title: 'Sustainable Architecture: Building Tomorrow\'s Cities Today',
    description: 'Discover innovative architectural approaches that are reshaping urban landscapes with sustainability at their core, from green skyscrapers to self-sufficient communities.',
    author: 'Marcus Chen',
    date: '2024-11-08',
    readingTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1565599573128-ae3ef5c9f478?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JlZW4lMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    tags: ['Architecture', 'Sustainability', 'Urban Planning']
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <article className="container mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-24 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-4 md:mb-6 lg:mb-8">
            <Button asChild variant="ghost" className="mb-2 sm:mb-4 text-sm sm:text-base">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Back to Blog</span>
                <span className="xs:hidden">Back</span>
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-6 md:mb-8 lg:mb-12">
            <div className="mb-4 md:mb-6 lg:mb-8">
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4 lg:mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight px-1">
                {post.title}
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg xl:text-xl text-muted-foreground mb-4 md:mb-6 leading-relaxed px-1">
                {post.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 md:gap-6 text-xs sm:text-sm md:text-base text-muted-foreground">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  <span className="font-medium truncate">{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  <time dateTime={post.date} className="whitespace-nowrap">{formatDate(post.date)}</time>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  <span className="whitespace-nowrap">{post.readingTime}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-40 sm:h-48 md:h-64 lg:h-80 xl:h-96 mb-4 md:mb-6 lg:mb-8 rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg md:shadow-xl lg:shadow-2xl mx-1 sm:mx-0">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none 
            prose-headings:scroll-m-20 prose-headings:font-bold 
            prose-h2:text-xl md:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mb-3 md:prose-h2:mb-4
            prose-h3:text-lg md:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mb-2 md:prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-3 md:prose-p:mb-4
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
            prose-strong:text-foreground 
            prose-img:rounded-lg md:prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:h-auto
            prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1
            dark:prose-invert">
            
            <p>
              As urban populations continue to swell and climate change intensifies, the architectural profession faces an unprecedented challenge: how to create beautiful, functional spaces while minimizing environmental impact. The answer lies in sustainable architecture—a design philosophy that harmonizes human needs with ecological responsibility. This movement is not merely about adding solar panels to existing structures; it represents a fundamental reimagining of how buildings interact with their environment, consume resources, and contribute to urban ecosystems.
            </p>

            <p>
              Today's sustainable architecture goes far beyond basic energy efficiency. It encompasses everything from the selection of locally-sourced materials to the integration of living systems that purify air and manage stormwater. As we stand at the crossroads of rapid urbanization and environmental crisis, sustainable architecture offers a path toward cities that not only minimize harm but actively contribute to planetary health.
            </p>

            <h2>The Evolution of Green Building Standards</h2>
            
            <p>
              The journey toward sustainable architecture began in earnest during the 1970s energy crisis, when architects and engineers first seriously considered buildings' environmental impact. Early efforts focused primarily on energy conservation through improved insulation and more efficient heating systems. However, the field has evolved dramatically over the past five decades.
            </p>

            <p>
              The introduction of LEED (Leadership in Energy and Environmental Design) certification in 2000 marked a turning point, providing a standardized framework for measuring building sustainability. Since then, numerous other certification systems have emerged, including BREEAM (Building Research Establishment Environmental Assessment Method), Living Building Challenge, and Passive House standards, each pushing the boundaries of what constitutes truly sustainable construction.
            </p>

            <p>
              Modern green building standards now address the complete lifecycle of structures, from material extraction and transportation to end-of-life demolition and waste management. This holistic approach considers embodied carbon—the greenhouse gas emissions associated with building materials and construction processes—alongside operational energy use throughout a building's lifespan.
            </p>

            <p>
              The most ambitious contemporary standards, such as the Living Building Challenge, require buildings to generate more energy than they consume, capture and treat all water on-site, and be constructed entirely from non-toxic materials. These "regenerative" buildings represent the cutting edge of sustainable design, demonstrating that architecture can be a net positive force for environmental health.
            </p>

            <h2>Innovative Materials and Construction Techniques</h2>

            <h3>Bio-based and Recycled Materials</h3>

            <p>
              The construction industry accounts for approximately 40% of global carbon emissions, with a significant portion stemming from material production. Sustainable architecture addresses this challenge through innovative material choices that reduce environmental impact while maintaining structural integrity and aesthetic appeal.
            </p>

            <p>
              Biomaterials are experiencing a renaissance in contemporary architecture. Engineered bamboo, for instance, offers strength comparable to steel while sequestering carbon as it grows. Cross-laminated timber (CLT) from sustainably managed forests provides an alternative to concrete and steel for mid-rise construction, with the added benefit of carbon storage throughout the building's lifetime.
            </p>

            <p>
              Mycelium-based materials, grown from mushroom root structures, are being developed as alternatives to conventional insulation and even structural elements. These materials can be grown in controlled environments using agricultural waste, creating a completely circular material cycle that eliminates traditional waste streams.
            </p>

            <p>
              Recycled and upcycled materials are finding new applications in sustainable construction. Reclaimed steel, recycled concrete aggregates, and even waste materials like plastic bottles are being transformed into high-performance building components. Architects like Sarah Wigglesworth and Jeremy Till have demonstrated how unconventional recycled materials—including straw bales and recycled denim insulation—can create buildings that are both environmentally responsible and architecturally striking.
            </p>

            <h3>Advanced Building Systems</h3>

            <p>
              Contemporary sustainable architecture integrates sophisticated building systems that optimize performance while minimizing resource consumption. Integrated photovoltaic systems now seamlessly incorporate solar energy generation into building facades and roofing systems, eliminating the visual impact of traditional panel installations while maximizing energy production.
            </p>

            <p>
              Geothermal systems tap into the earth's stable underground temperatures to provide efficient heating and cooling with minimal energy input. These systems, combined with thermal mass strategies and passive solar design, can reduce building energy consumption by 50% or more compared to conventional construction.
            </p>

            <p>
              Smart building technologies enable real-time optimization of energy use, automatically adjusting lighting, ventilation, and temperature based on occupancy patterns and environmental conditions. Machine learning algorithms analyze building performance data to identify opportunities for further efficiency improvements, creating structures that become more sustainable over time.
            </p>

            <h2>Biophilic Design and Living Architecture</h2>

            <p>
              Biophilic design—the practice of incorporating natural elements into built environments—represents one of the most visually striking aspects of sustainable architecture. Research consistently demonstrates that exposure to natural elements improves human health, productivity, and wellbeing, making biophilic design a crucial component of sustainable building practices.
            </p>

            <p>
              Living walls and green roofs transform buildings into vertical ecosystems that provide habitat for urban wildlife while improving air quality and managing stormwater. The California Academy of Sciences in San Francisco, designed by Renzo Piano, features a 2.5-acre living roof that insulates the building, provides habitat for native species, and captures rainwater for irrigation.
            </p>

            <p>
              Advanced hydroponic and aeroponic systems enable the integration of food production into building design, creating opportunities for urban agriculture that reduces transportation emissions while providing fresh produce for building occupants. The Pasona O2 office building in Tokyo incorporates over 200 species of fruits, vegetables, and grains throughout its workspaces, demonstrating how buildings can contribute to food security while enhancing occupant experience.
            </p>

            <p>
              Indoor air purification through plant-based systems addresses the challenge of urban air pollution while reducing reliance on mechanical ventilation. NASA research has identified numerous plant species that effectively remove common indoor pollutants, and architects are now designing buildings that leverage these natural air purification systems to improve indoor air quality while reducing energy consumption.
            </p>

            <h2>Water Management and Circular Systems</h2>

            <p>
              Water scarcity affects billions of people worldwide, making water-efficient building design a critical component of sustainable architecture. Modern sustainable buildings implement comprehensive water management strategies that capture, treat, and reuse water on-site, reducing both consumption and pollution.
            </p>

            <p>
              Rainwater harvesting systems collect precipitation from roof surfaces and direct it to storage tanks for later use in irrigation, toilet flushing, and cooling systems. Advanced treatment technologies enable captured rainwater to meet potable water standards, reducing dependence on municipal water supplies.
            </p>

            <p>
              Greywater systems capture and treat wastewater from sinks, showers, and laundry for reuse in irrigation and toilet flushing. These systems can reduce a building's potable water consumption by 30-50% while reducing the burden on municipal sewage treatment facilities.
            </p>

            <p>
              Constructed wetlands and living machines treat blackwater on-site using natural biological processes, eliminating the need for connection to centralized sewage treatment plants. These systems not only treat wastewater but also provide habitat for wildlife and aesthetic amenities for building occupants.
            </p>

            <p>
              Permeable paving systems and bioswales manage stormwater runoff, preventing pollution of natural water bodies while recharging groundwater supplies. These landscape-integrated solutions demonstrate how sustainable architecture extends beyond building envelopes to encompass entire site ecosystems.
            </p>

            <h2>Passive Design Strategies</h2>

            <p>
              The most sustainable energy is energy that doesn't need to be produced at all. Passive design strategies leverage natural environmental conditions to maintain comfortable interior conditions with minimal mechanical systems, representing the foundation of sustainable architecture.
            </p>

            <p>
              Solar orientation and building massing optimization reduce heating and cooling loads through strategic placement of windows, thermal mass, and shading elements. South-facing windows in northern climates maximize winter solar gain while overhangs prevent summer overheating. Natural ventilation strategies use wind patterns and thermal dynamics to circulate air without mechanical systems.
            </p>

            <p>
              Thermal mass strategies store and release heat to moderate interior temperatures naturally. Materials like adobe, rammed earth, and concrete absorb excess heat during warm periods and release it when temperatures drop, reducing the need for active heating and cooling systems.
            </p>

            <p>
              Daylighting design maximizes natural illumination while preventing glare and overheating. Advanced daylight modeling software enables architects to optimize window placement and size to provide adequate natural light throughout building interiors, reducing electricity consumption for artificial lighting.
            </p>

            <p>
              Natural ventilation strategies create comfortable interior conditions using wind pressure and thermal stack effects. Carefully designed window placement, internal layouts, and building forms can eliminate the need for mechanical ventilation in many climates, dramatically reducing energy consumption.
            </p>

            <h2>Community-Scale Sustainable Design</h2>

            <p>
              Individual building sustainability must be considered within broader urban and community contexts to achieve maximum environmental benefit. Sustainable neighborhood design addresses transportation, infrastructure, and community resource sharing to create truly sustainable human settlements.
            </p>

            <p>
              Transit-oriented development concentrates housing, employment, and services around public transportation nodes, reducing automobile dependence and associated emissions. Mixed-use development enables residents to walk or bicycle to work, shopping, and entertainment, further reducing transportation-related environmental impact.
            </p>

            <p>
              District energy systems share heating, cooling, and electricity generation among multiple buildings, improving efficiency and reducing infrastructure requirements. These systems can incorporate renewable energy sources, waste heat recovery, and thermal storage to optimize performance at the community scale.
            </p>

            <p>
              Shared resource systems enable communities to reduce individual building footprints while maintaining high quality of life. Community gardens, tool libraries, co-working spaces, and shared recreational facilities reduce the need for space and equipment in individual buildings while fostering social connections.
            </p>

            <p>
              Urban density strategies balance the benefits of compact development—reduced infrastructure requirements and transportation emissions—with quality of life considerations. Well-designed dense neighborhoods can provide superior environmental performance while offering amenities and services that enhance residents' lives.
            </p>

            <h2>Technology Integration and Smart Systems</h2>

            <p>
              Digital technology increasingly plays a crucial role in sustainable architecture, enabling buildings to respond dynamically to environmental conditions and occupant needs. Internet of Things (IoT) sensors monitor everything from air quality and lighting levels to occupancy patterns and energy consumption, providing data for real-time optimization.
            </p>

            <p>
              Building Information Modeling (BIM) software enables architects to simulate building performance during the design phase, identifying opportunities for improvement before construction begins. These tools can model energy consumption, daylighting, thermal comfort, and even lifecycle environmental impact, enabling evidence-based design decisions.
            </p>

            <p>
              Artificial intelligence systems analyze building performance data to identify patterns and optimize operations automatically. These systems can learn from occupant behavior and environmental conditions to predict needs and adjust building systems preemptively, maximizing efficiency while maintaining comfort.
            </p>

            <p>
              Blockchain technology enables peer-to-peer energy trading among buildings with renewable energy generation capacity, creating local energy markets that reduce transmission losses and grid dependence. Buildings can sell excess solar energy to neighbors during peak production periods and purchase renewable energy when local generation is insufficient.
            </p>

            <h2>Challenges and Future Directions</h2>

            <p>
              Despite significant advances in sustainable architecture, numerous challenges remain in achieving widespread adoption of truly sustainable building practices. Initial cost premiums for sustainable technologies and materials continue to present barriers, though these costs are declining as sustainable solutions achieve market scale.
            </p>

            <p>
              Building codes and zoning regulations in many jurisdictions lag behind sustainable design innovations, preventing architects from implementing cutting-edge solutions. Advocacy for updated regulations that support sustainable development remains crucial for advancing the field.
            </p>

            <p>
              Skills gaps in the construction industry limit the effective implementation of sustainable technologies. Training programs for architects, engineers, and construction workers must evolve to include sustainable design and construction techniques.
            </p>

            <p>
              Cultural resistance to unconventional building approaches can limit market acceptance of innovative sustainable solutions. Education and demonstration projects help build public acceptance of sustainable architecture while showcasing its benefits and beauty.
            </p>

            <p>
              Looking ahead, sustainable architecture will likely integrate even more closely with natural systems, potentially incorporating living materials that grow and adapt over time. Advances in biotechnology may enable buildings that actively remove carbon dioxide from the atmosphere or produce oxygen through integrated plant systems.
            </p>

            <h2>The Path Forward</h2>

            <p>
              Sustainable architecture represents humanity's best hope for creating built environments that support both human flourishing and planetary health. As climate change accelerates and urban populations continue to grow, the principles and practices of sustainable design must become the norm rather than the exception.
            </p>

            <p>
              The transformation requires collaboration among architects, engineers, policymakers, and communities to create supportive frameworks for sustainable development. Education and public engagement will play crucial roles in building demand for sustainable buildings and creating cultural acceptance of new approaches to construction and urban development.
            </p>

            <p>
              Financial institutions and real estate markets must evolve to properly value the long-term benefits of sustainable buildings, including reduced operating costs, improved occupant health and productivity, and enhanced resilience to climate change impacts. Green financing mechanisms and sustainability-linked loans can help bridge the gap between initial costs and long-term benefits.
            </p>

            <p>
              The future of sustainable architecture lies not just in individual building performance but in creating regenerative communities that contribute positively to environmental and social health. This vision requires thinking beyond sustainability toward regenerative design that actively repairs and enhances natural and social systems.
            </p>

            <p>
              As we face the dual challenges of climate change and rapid urbanization, sustainable architecture offers a path toward cities that are not only environmentally responsible but also beautiful, healthy, and inspiring places to live. The buildings we construct today will shape human settlements for generations to come—making the choice of sustainable design not just an environmental imperative but a moral obligation to future generations.
            </p>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 md:mt-16 pt-6 md:pt-8 border-t">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-medium text-sm md:text-base">{post.author}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Published on {formatDate(post.date)}</p>
                </div>
              </div>
              
              <Button asChild className="w-full sm:w-auto">
                <Link href="/blog">
                  More Articles
                </Link>
              </Button>
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
}
