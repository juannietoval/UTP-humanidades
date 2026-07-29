import React from 'react';
import nucleo1 from '../assets/assets/nucleo_1.png';
import nucleo2 from '../assets/assets/nucleo_2.png';
import nucleo3 from '../assets/assets/nucleo_3.png';

export default function ProgramaPage() {
  const nucleos = [
    { id: "I", title: "Diálogos y dilemas sobre lo humano", desc: "Tema 1. Qué es lo humano: el debate entre lo divino y lo animal; y entre lo biológico y lo cultural (el animal simbólico).\nTema 2. Paradigmas sobre lo humano: El lugar de las Ciencias Sociales y Humanas en las denominadas Ciencias Exactas. Debates, dilemas y tensiones entre lo clásico y lo contemporáneo.\nTema 3. Lo humano en las sociedades contemporáneas: Humanismos, Pos-humanismos y Transhumanismos.", img: nucleo1 },
    { id: "II", title: "Vivir, recordar y re-existir: contextos contemporáneos", desc: "Tema 1. La memoria y la condición humana: individual, colectiva e histórica\nTema 2. Memoria de los conflictos y las violencias: miradas globales y nacionales\nTema 3. Memorias locales del dolor y la resistencia: violencias y paces urbanas", img: nucleo2 },
    { id: "III", title: "Jóvenes y responsabilidad política en las sociedades contemporáneas", desc: "Tema 1. La política y lo político.\nTema 2. Sujetos políticos y subjetividad política juvenil\nTema 3. La acción política como expresión juvenil: nuevos sentidos de mundo y ciudad.", img: nucleo3 }
  ];

  return (
    <section className="section" id="programa" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 style={{ marginBottom: 'calc(var(--base-unit) * 6)', borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}>Programa Académico</h2>

        {/* 1. Descripción */}
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 12' }}>
            <h2 style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '8px', wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>1. Descripción y contenidos</h2>
          </div>
          <div style={{ gridColumn: 'span 12', fontSize: '1.125rem' }}>
            <p>Las competencias académicas implican la formación de profesionales no solo en un quehacer específico, sino también en el desarrollo de capacidades comprensivas y analíticas sobre sí mismos y sobre su entorno. En este sentido, resulta fundamental que la educación superior aporte herramientas que posibiliten un acercamiento reflexivo, sensible y situado a las múltiples dimensiones de lo humano —histórica, económica, política, social y cultural—, con el propósito de alcanzar una mayor comprensión de lo que somos y de lo que hemos sido, como base para proyectar la existencia y el mundo por venir.</p>
            <p>La reflexión sobre el sujeto contemporáneo, entendido como agente histórico y transformador de la realidad social, supone reconocer las múltiples dinámicas que han configurado el presente, un tiempo marcado por profundos desafíos a escala global, nacional y local. La crisis del capitalismo, la expansión de los gobiernos con tendencias autoritarias, la exacerbación de los conflictos internacionales, el cambio climático, la polarización política, el consumismo y la revolución tecnológica propia de la era digital, así como la creciente movilización social en torno a la paz, la memoria y el cuidado de la vida en todas sus formas, convierten este momento histórico en un reto mayúsculo para todos los campos del conocimiento y, en consecuencia, para los procesos educativos.</p>
            <p>En este marco, la asignatura se concibe como un escenario de reflexión, diálogo y creación individual y colectiva en torno a lo humano en el mundo contemporáneo, con un énfasis particular en su dimensión política, en la formación de sujetos políticos y en los procesos de construcción de memoria que desarrollan los sujetos y las comunidades para otorgar sentido al pasado, en función de la construcción de un presente y un futuro en los que se dignifique la vida humana. Este énfasis busca fortalecer en las y los estudiantes las herramientas necesarias para reconocer, comprender e interpretar críticamente la realidad social, así como incentivar su participación política como jóvenes y su incidencia en la construcción colectiva, creativa y común de una sociedad cada vez más justa, incluyente y democrática.</p>
          </div>
        </div>

        {/* 2. Objetivos */}
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>2. Objetivos</h3>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <ul className="archival-list">
              <li>
                <span className="date">Institucional</span>
                <span>Generar espacios de reflexión y acción que fortalezcan la educación para la libertad, la autonomía, el desarrollo y la vivencia de los valores institucionales como persona, profesional y miembro del colectivo social.</span>
              </li>
              <li>
                <span className="date">Asignatura</span>
                <span>Comprender el papel de las Humanidades y las Ciencias sociales desde las dinámicas de la modernidad, con un contexto histórico. Analizar el contexto social, político y cultural con herramientas claras tanto como ciudadanos como profesionales con pensamiento crítico.</span>
              </li>
              <li>
                <span className="date">Programa</span>
                <span>Fortalecer en los estudiantes una formación integral que les permita desempeñarse con idoneidad, humanismo y sentido ético, comprender las dinámicas del contexto local y global y participar activamente en su transformación.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Resultados de aprendizaje e indicadores */}
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>3. Resultados e Indicadores</h3>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <ul className="archival-list">
              <li>
                <span className="date">R. Institucional</span>
                <span>El estudiante y el profesional de la Universidad Tecnológica de Pereira identifica, contextualiza y resuelve situaciones concretas desde una perspectiva de responsabilidad social.</span>
              </li>
              <li>
                <span className="date">R. Asignatura 1</span>
                <span>El estudiante conoce y comprende las características, dinámicas y problemáticas históricas, políticas, culturales y estéticas de las sociedades contemporáneas.</span>
              </li>
              <li>
                <span className="date">R. Asignatura 2</span>
                <span>El estudiante argumenta sus ideas y participa de espacios académicos, políticos y socioculturales a partir de ellas.</span>
              </li>
              <li>
                <span className="date">Ind. Liderazgo</span>
                <span>Incide con iniciativa en la toma de decisiones, en las distintas prácticas sociales, laborales, políticas, culturales, estéticas, deportivas y artísticas, en la que está inmerso como ciudadano, estudiante y profesional.</span>
              </li>
              <li>
                <span className="date">Ind. Respeto</span>
                <span>Interactúa de manera profesional con comunidades en las que identifica diversas formas de la experiencia humana reconociendo y aceptando al Otro y lo Otro desde la identidad y la diferencia, para la construcción de la cultura de paz, tolerancia y reconciliación.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Contenido */}
        <h3 style={{ marginBottom: 'calc(var(--base-unit) * 4)' }}>4. Contenido</h3>
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          {nucleos.map((n, i) => (
            <div className="card" style={{ gridColumn: 'span 4' }} key={i}>
              {n.img ? (
                <div className="portrait-frame">
                  <img src={n.img} alt={`Retrato histórico ${n.id}`} loading="lazy" />
                </div>
              ) : (
                <div style={{ border: '1px solid var(--primary)', padding: 'calc(var(--base-unit)*4)', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--tertiary)', marginBottom: 'calc(var(--base-unit) * 2)' }}>
                  <h1 style={{ margin: 0 }}>{n.id}</h1>
                </div>
              )}
              <span className="label">Núcleo Problemático {n.id}</span>
              <h3 className="card-title">{n.title}</h3>
              <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{n.desc}</p>
            </div>
          ))}
        </div>

        {/* 5. Requisitos */}
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>5. Requisitos</h3>
          </div>
          <div style={{ gridColumn: 'span 8', fontSize: '1.125rem' }}>
            <p>No tiene prerrequisitos.</p>
          </div>
        </div>

        {/* 6. Recursos */}
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>6. Recursos</h3>
            <p className="label">Lecturas y Audiovisuales</p>
          </div>
          <div style={{ gridColumn: 'span 8', fontSize: '1.125rem' }}>
            <h4>Núcleo Problemático 1</h4>
            <ul>
              <li>Arendt, H. (2005). La condición humana. Argentina: Ediciones Paidós.</li>
              <li>Ballesteros, J. (2012). Más allá de la eugenesia. El poshumanismo como negación del homo patiens.</li>
              <li>Savater, Fernando (1999). Las preguntas de la vida.</li>
              <li>Yuval Harari. N. (2014). De animales a Dioses. Debate.</li>
            </ul>
            <p><strong>Audiovisuales:</strong> Serie Black Mirror (2011-2023), Serie Cyberpunk (2022), Video TEDxYouth: Are young people interested in politics?</p>
            
            <h4 style={{ marginTop: '24px' }}>Núcleo Problemático 2</h4>
            <ul>
              <li>Agamben, Giorgio (2007), ¿Qué es lo contemporáneo?</li>
              <li>Galtun, J. (2016). La violencia: cultural, estructural y directa.</li>
              <li>Muñoz, Francisco A. La paz imperfecta ante un universo en conflicto.</li>
              <li>Arocha, J. (1995). Colombia: violencia y democracia.</li>
              <li>Borges, Jorge Luis. Funes el memorioso.</li>
              <li>Jelin, Elizabeth. 2020. De qué hablamos cuando hablamos de memorias.</li>
              <li>Martínez, J. (2021). Morir, resistir y esperar. El ritual en las víctimas por desaparición forzada.</li>
            </ul>
            <p><strong>Audiovisuales:</strong> Película Relatos Salvajes (2014), Matar a Jesús (2017), Podcast Relatos Anfibios, Podcast Luz de la Noche (Comisión de la Verdad), Podcast Solaris.</p>
            
            <h4 style={{ marginTop: '24px' }}>Núcleo Problemático 3</h4>
            <ul>
              <li>Savater, Fernando. Política para Amador.</li>
              <li>Mouffe, Ch. (2010). En torno a lo político.</li>
              <li>Arent, H. (2012). Qué es la política.</li>
              <li>Nusbaum, M. (2010). Sin fines de lucro. Por qué la democracia necesita de las Humanidades.</li>
              <li>Reguillo, Rossana (2003). “Ciudadanías Juveniles en América Latina”.</li>
              <li>Martínez, L; Carrero, A; Murillo, J. (2019). Paces, justicia y convivencia social.</li>
              <li>Díaz, A; Martínez, J; Suarez, P. (2020). Educación Política en el aula de clase.</li>
            </ul>
            <p><strong>Audiovisuales:</strong> Jóvenes y política en tiempos de crisis, Multimedia Comisión de Esclarecimiento de la Verdad.</p>
          </div>
        </div>

        {/* 7 y 8. Herramientas y Laboratorio */}
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>7. Herramientas de enseñanza</h3>
            <h3 style={{ marginTop: '32px' }}>8. Trabajos en laboratorio</h3>
          </div>
          <div style={{ gridColumn: 'span 8', fontSize: '1.125rem' }}>
            <p>Desarrollo del curso en modalidad presencial, en donde se hace exploración de contenidos teóricos y la creación de significados epistémicos.</p>
            <ul>
              <li>Potenciar la reflexión teórica a partir de explicaciones y apropiación de textos especializados.</li>
              <li>Lectura comprensiva de textos especializados.</li>
              <li>Ampliar los contextos reflexivos con el análisis de materiales visuales y audiovisuales.</li>
              <li>Articulación conceptual con experiencias propias y de “otros”.</li>
              <li>Elaboración de nuevos contenidos, productos y significados.</li>
            </ul>
            <p style={{ marginTop: '24px' }}>Este espacio académico se interesa particularmente por procesos de creación colectiva que vinculen las temáticas desarrolladas en clase con procesos de creación de texto, de creación de imagen y reflexión sobre la misma:</p>
            <ul>
              <li>Ejercicios de análisis sobre ámbitos de indagación teórico-práctica.</li>
              <li>Ejercicios de comprensión conceptual desde Mapeos colectivos.</li>
              <li>Laboratorios de creación visual y sonora.</li>
              <li>Talleres prácticos y de contextualización de contenidos.</li>
              <li>Proyectos finales; pieza editorial, manifiesto, ensayos visuales.</li>
            </ul>
          </div>
        </div>

        {/* 9 y 10. Métodos */}
        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>9. Aprendizaje</h3>
          </div>
          <div style={{ gridColumn: 'span 8', fontSize: '1.125rem' }}>
            <p>Problematización; Contextualización; configuración hermenéutica de textos en distintos soportes. Desarrollo de la AUTONOMÍA, como “la capacidad” de desarrollar procesos de formación de manera consciente y voluntaria, en niveles cada vez más complejos.</p>
          </div>
        </div>

        <div className="grid" style={{ marginBottom: 'calc(var(--base-unit) * 8)' }}>
          <div style={{ gridColumn: 'span 4' }}>
            <h3>10. Evaluación</h3>
          </div>
          <div style={{ gridColumn: 'span 8' }}>
            <p style={{ fontSize: '1.125rem', marginBottom: '24px' }}>La evaluación del curso se desarrollará de manera continua, formativa y acumulativa, buscando valorar la comprensión y la capacidad de análisis de los temas, a partir de la formación de pensamiento crítico, desde la acción creativa, a partir de documentos escritos, productos visuales o auditivos que aporten a la comprensión de los núcleos problemáticos.</p>
            <div className="grid">
              <div className="card" style={{ gridColumn: 'span 4', backgroundColor: 'var(--neutral)' }}>
                <h1 style={{ marginBottom: '8px' }}>30%</h1>
                <span className="label">Primer Parcial</span>
                <p style={{ fontSize: '14px', marginTop: '16px' }}>Actividades desarrolladas en el núcleo problemático 1.</p>
              </div>
              <div className="card" style={{ gridColumn: 'span 4', backgroundColor: 'var(--neutral)' }}>
                <h1 style={{ marginBottom: '8px' }}>30%</h1>
                <span className="label">Segundo Parcial</span>
                <p style={{ fontSize: '14px', marginTop: '16px' }}>Actividades desarrolladas en el núcleo problemático 2.</p>
              </div>
              <div className="card" style={{ gridColumn: 'span 4', backgroundColor: 'var(--neutral)' }}>
                <h1 style={{ marginBottom: '8px' }}>40%</h1>
                <span className="label">Parcial final</span>
                <p style={{ fontSize: '14px', marginTop: '16px' }}>Actividades desarrolladas en el núcleo problemático 3.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
