# math001 - Cambios v3 (Tablas de Multiplicar)

## Resumen de Cambios Aplicados

Se ha implementado el nuevo modo de juego "Tablas de Multiplicar" según lo especificado en `v3.txt`.

---

## ✖️ Nuevo Juego: Tablas de Multiplicar

### 1. Configuración
- **Nuevo botón** "✖️ Tablas multiplicar" en la pantalla de configuración.
- **Dificultad y Cantidad:**
    - **Fácil:** 5 operaciones
    - **Media:** 10 operaciones
    - **Difícil:** 15 operaciones

### 2. Lógica del Juego
- **Generación:**
    - Operaciones de la forma `X x Y`
    - Números aleatorios entre **2 y 9** (ambos inclusive)
    - Resultado siempre positivo (obviamente)

### 3. Interfaz y Navegación
- **Diseño Horizontal:**
    - Se muestra: `[X] x [Y] = [ ][ ]`
    - Los números del enunciado están en cuadros no editables.
    - El resultado tiene **siempre 2 cuadros editables** (suficiente para resultados hasta 9x9=81).
- **Navegación de Inputs:**
    - **Izquierda a Derecha:** Al escribir un número, el foco pasa al siguiente cuadro a la derecha (comportamiento natural para escribir resultados de izquierda a derecha, ej: para 45 escribes 4 y luego 5).
    - *Nota: Esto difiere de Suma/Resta que usan Derecha a Izquierda.*

### 4. Sistema de Puntuación (Todo o Nada)
- A diferencia de Suma/Resta donde cada operación cuenta, aquí se premia la **consistencia total**.
- **Regla:** Solo se obtienen puntos si **TODAS** las operaciones del juego son correctas.
- **Puntos:**
    - Fácil (5 ops): **1 punto**
    - Media (10 ops): **2 puntos**
    - Difícil (15 ops): **5 puntos**

---

## 💻 Detalles Técnicos

### HTML (`index.html`)
- Agregado botón en el grupo de opciones de tipo de juego.

### JavaScript (`app.js`)
- `DIFFICULTY_CONFIG`: Añadida configuración `multiplicacion`.
- `generateOperations()`: Lógica para generar pares de números 2-9.
- `renderGameScreen()`: Etiqueta correcta para el título.
- `renderOperation()`:
    - Renderizado específico horizontal.
    - Lógica de navegación de foco condicional (L-R para multi, R-L para otros).
- `finishGame()`: Lógica de puntuación condicional (Todo o Nada para multi).

### CSS (`style.css`)
- Clases `.multiplication-row`, `.digit-box-flat`, `.operation-symbol-flat` para el diseño horizontal.

---

## 🧪 Cómo Probar

1. **Iniciar Servidor:**
   ```bash
   python3 -m http.server 8080
   ```
2. **Navegar a:** http://localhost:8080
3. **Configurar Juego:**
   - Seleccionar Avatar y Código.
   - Seleccionar "Tablas multiplicar".
   - Elegir dificultad (ej: Fácil).
4. **Jugar:**
   - Verificar que aparecen 5 operaciones.
   - Verificar formato `X x Y = [ ][ ]`.
   - Escribir resultados (verificar que el cursor avanza a la derecha).
5. **Verificar Puntuación:**
   - Intentar fallar una: Debería dar **0 puntos**.
   - Acertar todas: Debería dar **1 punto** (en Fácil).

---

## Estado: ✅ COMPLETADO

El nuevo modo de juego está totalmente funcional e integrado con el sistema existente (historial, leaderboard, etc.).
