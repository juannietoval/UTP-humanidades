import portrait1 from '../assets/assets/portrait_1.png';
import portrait2 from '../assets/assets/portrait_2.png';

export const syllabusData = {
  programa: {
    objetivos: [
      { tipo: "INSTITUCIONAL", desc: "Generar espacios de reflexión y acción que fortalezcan la educación para la libertad, la autonomía, el desarrollo y la vivencia de los valores institucionales." },
      { tipo: "ASIGNATURA", desc: "Comprender el papel de las Humanidades y las Ciencias sociales desde las dinámicas de la modernidad. Analizar el contexto social, político y cultural con pensamiento crítico." },
      { tipo: "PROGRAMA", desc: "Fortalecer en los estudiantes una formación integral que les permita desempeñarse con idoneidad, humanismo y sentido ético, participando activamente en su transformación." }
    ],
    resultados: [
      { tipo: "APRENDIZAJE", desc: "Identifica, contextualiza y resuelve situaciones concretas desde una perspectiva de responsabilidad social. Conoce y comprende las dinámicas históricas, políticas y socioculturales contemporáneas." },
      { tipo: "LIDERAZGO", desc: "Incide con iniciativa en la toma de decisiones en distintas prácticas sociales, laborales, políticas, culturales y artísticas." },
      { tipo: "RESPETO", desc: "Interactúa de manera profesional reconociendo y aceptando al Otro y lo Otro desde la identidad y la diferencia, para la construcción de la paz." }
    ],
    nucleos: [
      { id: "I", title: "Diálogos y dilemas sobre lo humano", desc: "Qué es lo humano: el debate divino vs animal; biológico vs cultural. Paradigmas de las Ciencias Sociales. Humanismos, Pos-humanismos y Transhumanismos.", img: portrait1, lectura: "H. Arendt (2005) \"La condición humana\"." },
      { id: "II", title: "Vivir, recordar y re-existir", desc: "La memoria y la condición humana: individual, colectiva e histórica. Memoria de conflictos, miradas globales/nacionales, y violencias y paces urbanas.", img: portrait2, lectura: "G. Agamben (2007) \"¿Qué es lo contemporáneo?\"." },
      { id: "III", title: "Jóvenes y responsabilidad política", desc: "La política y lo político. Sujetos políticos y subjetividad política juvenil. La acción política como expresión juvenil en nuevos sentidos de mundo y ciudad.", img: null, lectura: "F. Savater \"Política para Amador\"." }
    ]
  },
  proceso: {
    metodologia: [
      { tipo: "APRENDIZAJE", desc: "Problematización, contextualización y configuración hermenéutica de textos. Desarrollo de la AUTONOMÍA para procesos de formación consciente." },
      { tipo: "HERRAMIENTAS", desc: "Reflexión teórica a partir de textos, lectura comprensiva, análisis de materiales audiovisuales y desarrollo de diálogos académicos." },
      { tipo: "LABORATORIO", desc: "Procesos de creación colectiva, mapeos conceptuales, laboratorios de creación visual y sonora, culminando en manifiestos o piezas editoriales." }
    ],
    evaluacion: [
      { percent: "30%", label: "Primer Parcial", desc: "Actividades desarrolladas en el núcleo problemático 1." },
      { percent: "30%", label: "Segundo Parcial", desc: "Actividades desarrolladas en el núcleo problemático 2." },
      { percent: "40%", label: "Parcial Final", desc: "Actividades desarrolladas en el núcleo problemático 3." }
    ]
  }
};
