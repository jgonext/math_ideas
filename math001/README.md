# 🎮 Juego de Matemáticas - math001

Aplicación web educativa para niños de 8-10 años que enseña suma y resta a través de una experiencia interactiva y gamificada con avatares kawaii de animales.

![Estado](https://img.shields.io/badge/estado-listo-brightgreen)
![Versión](https://img.shields.io/badge/versión-1.0-blue)
![Licencia](https://img.shields.io/badge/licencia-MIT-yellow)

## 📋 Descripción

**math001** es un juego educativo que permite a los niños practicar operaciones matemáticas básicas (suma y resta) de una manera visual y atractiva. El juego presenta las operaciones en un formato de cuadrícula similar a papel cuadriculado, donde cada dígito tiene su propia casilla, ayudando a los niños a comprender el concepto de alineación y valor posicional.

## ✨ Características Principales

### 🎯 Funcionalidades del Juego
- **Dos tipos de juego**: Suma y Resta
- **Tres niveles de dificultad**: Fácil, Media, Difícil
- **Sistema de puntos**: 1, 2 o 5 puntos XP según la dificultad
- **Cronómetro en tiempo real**: Mide el tiempo de cada partida
- **Retroalimentación inmediata**: Indica si la respuesta es correcta o incorrecta

### 🦁 Sistema de Avatares
8 adorables avatares kawaii de animales para elegir:
- 🐥 Pollito
- 🐱 Gatito
- 🐶 Perrito
- 🐬 Delfín
- 🐊 Cocodrilo
- 🦛 Hipopótamo
- 🦁 León
- 🐘 Elefante

### 📊 Historial de Partidas
- Almacenamiento persistente usando localStorage
- Registro de todas las partidas jugadas
- Información detallada: fecha, usuario, tipo, nivel, puntuación, tiempo
- Función para eliminar entradas individuales

### 🎨 Diseño Premium
- Interfaz colorida y atractiva para niños
- Gradientes vibrantes y animaciones suaves
- Diseño responsive (funciona en móviles y tablets)
- Tipografías modernas (Fredoka y Outfit)
- Efectos hover y transiciones fluidas

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Sistema de diseño completo con variables CSS
- **JavaScript Vanilla**: Lógica del juego sin dependencias
- **LocalStorage API**: Persistencia de datos

## 📁 Estructura del Proyecto

```
math001/
├── index.html          # Estructura HTML principal
├── style.css           # Sistema de diseño completo
├── app.js              # Lógica del juego
├── README.md           # Este archivo
└── assets/             # Recursos del juego
    ├── avatar_chick_*.png       # Avatar Pollito
    ├── avatar_cat_*.png         # Avatar Gatito
    ├── avatar_dog_*.png         # Avatar Perrito
    ├── avatar_dolphin_*.png     # Avatar Delfín
    ├── avatar_crocodile_*.png   # Avatar Cocodrilo
    ├── avatar_hippo_*.png       # Avatar Hipopótamo
    ├── avatar_lion_*.png        # Avatar León
    └── avatar_elephant.svg      # Avatar Elefante
```

## 🚀 Despliegue Local

### Requisitos Previos

Necesitas tener instalado uno de los siguientes:
- **Python 3** (recomendado)
- **Node.js** con npm
- Cualquier servidor HTTP local

### Opción 1: Usando Python (Recomendado)

Python 3 suele venir preinstalado en la mayoría de sistemas Linux y macOS.

```bash
# Navega al directorio del proyecto
cd /ruta/a/math001

# Inicia el servidor HTTP en el puerto 8080
python3 -m http.server 8080
```

Luego abre tu navegador y visita:
```
http://localhost:8080
```

### Opción 2: Usando Python 2 (si no tienes Python 3)

```bash
cd /ruta/a/math001
python -m SimpleHTTPServer 8080
```

### Opción 3: Usando Node.js

Si tienes Node.js instalado, puedes usar `http-server`:

```bash
# Instala http-server globalmente (solo la primera vez)
npm install -g http-server

# Navega al directorio del proyecto
cd /ruta/a/math001

# Inicia el servidor
http-server -p 8080
```

### Opción 4: Usando npx (sin instalación)

```bash
cd /ruta/a/math001
npx http-server -p 8080
```

### Opción 5: Abrir directamente (limitado)

También puedes abrir el archivo `index.html` directamente en tu navegador, pero algunas funcionalidades podrían no funcionar correctamente debido a las políticas de seguridad CORS.

```bash
# En Linux
xdg-open index.html

# En macOS
open index.html

# En Windows
start index.html
```

## 🎮 Cómo Jugar

### 1. Configurar el Juego
1. Haz clic en **"Nuevo Juego"**
2. Selecciona tu **avatar** favorito
3. Ingresa tu **código de usuario** (3-5 letras/números)
4. Elige el **tipo de juego** (Suma o Resta)
5. Selecciona el **nivel de dificultad**:
   - **Fácil**: 2 números de 2-4 dígitos (1 punto)
   - **Media**: 3 números de 4-6 dígitos - Suma / 2 números - Resta (2 puntos)
   - **Difícil**: 4 números de 8 dígitos - Suma / 2 números - Resta (5 puntos)

### 2. Jugar
1. El cronómetro comenzará automáticamente
2. Verás la operación matemática en formato de cuadrícula
3. Ingresa tu respuesta dígito por dígito en las casillas
4. Haz clic en **"Finalizar"** cuando termines

### 3. Ver Resultados
- Se mostrará tu puntuación obtenida
- Verás si la respuesta fue correcta o incorrecta
- Si fue incorrecta, se mostrará la respuesta correcta
- Puedes jugar de nuevo o volver al menú

### 4. Consultar Historial
- Haz clic en **"Historial de Juegos"** desde el menú principal
- Verás todas tus partidas anteriores
- Puedes eliminar entradas específicas con el botón 🗑️

## 🎯 Configuración de Dificultad

### Suma
| Nivel | Cantidad de Números | Dígitos por Número | Puntos |
|-------|---------------------|-------------------|--------|
| Fácil | 2 | 2-4 | 1 XP |
| Media | 3 | 4-6 | 2 XP |
| Difícil | 4 | 8 | 5 XP |

### Resta
| Nivel | Cantidad de Números | Dígitos por Número | Puntos |
|-------|---------------------|-------------------|--------|
| Fácil | 2 | 2-4 | 1 XP |
| Media | 2 | 4-6 | 2 XP |
| Difícil | 2 | 8 | 5 XP |

> **Nota**: En las restas siempre se asegura que el resultado sea positivo.

## 🎓 Valor Educativo

Este juego ayuda a los niños a:
- ✅ Comprender el concepto de **valor posicional**
- ✅ Practicar **alineación correcta** de números
- ✅ Mejorar la **velocidad** en operaciones básicas
- ✅ Aprender de sus **errores** con retroalimentación inmediata
- ✅ Desarrollar **confianza** en matemáticas a través de la gamificación

## 🔧 Personalización

### Cambiar Puerto del Servidor

Si el puerto 8080 está ocupado, puedes usar otro:

```bash
# Python
python3 -m http.server 3000

# Node.js
npx http-server -p 3000
```

### Modificar Colores

Los colores se definen en [style.css](file:///home/wardog/workspace-ag/math_ideas/math001/style.css) usando variables CSS en `:root`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    /* ... más variables */
}
```

### Ajustar Dificultad

La configuración de dificultad se encuentra en [app.js](file:///home/wardog/workspace-ag/math_ideas/math001/app.js):

```javascript
const DIFFICULTY_CONFIG = {
    suma: {
        facil: { count: 2, minDigits: 2, maxDigits: 4 },
        media: { count: 3, minDigits: 4, maxDigits: 6 },
        dificil: { count: 4, minDigits: 8, maxDigits: 8 }
    },
    // ...
};
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (versión 90+)
- ✅ Firefox (versión 88+)
- ✅ Safari (versión 14+)
- ✅ Opera (versión 76+)
- ✅ Dispositivos móviles y tablets

## 🐛 Solución de Problemas

### El servidor no inicia
- Verifica que el puerto no esté ocupado
- Intenta con un puerto diferente
- Asegúrate de tener los permisos necesarios

### Las imágenes no cargan
- Verifica que estés accediendo vía `http://localhost` y no abriendo el archivo directamente
- Comprueba que exista la carpeta `assets/` con las imágenes

### El historial no se guarda
- Asegúrate de que el navegador permita localStorage
- Verifica que no estés en modo incógnito/privado
- Comprueba la configuración de privacidad del navegador

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, por favor:
- Abre un issue en el repositorio
- Contacta al equipo de desarrollo

## 🎉 Agradecimientos

- Diseño inspirado en principios de educación moderna
- Avatares kawaii diseñados para ser amigables y atractivos para niños
- Tipografías: Google Fonts (Fredoka y Outfit)

---

**¡Disfruta aprendiendo matemáticas!** 🎓✨
