# 2048 Game

A modern, animated implementation of the popular 2048 puzzle game built with vanilla JavaScript, HTML, and CSS.

## Features

- 🎮 Classic 2048 gameplay
- 🎨 Dynamic background color that changes based on the highest tile
- ✨ Smooth animations for tile appearance and merging
- 📊 Real-time score tracking
- 🔄 Restart functionality
- 📱 Responsive design (mobile-friendly)
- ⌨️ Keyboard controls (arrow keys)

## How to Play

1. Use the **arrow keys** to move tiles in the desired direction
2. When two tiles with the same number touch, they **merge into one**
3. The goal is to create a tile with the number **2048**
4. The game ends when no more moves are possible

## Controls

- **↑ Arrow Up** - Move tiles up
- **↓ Arrow Down** - Move tiles down
- **← Arrow Left** - Move tiles left
- **→ Arrow Right** - Move tiles right
- **Restart Button** - Reset the game

## Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start playing!

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the directory
cd 2048

# Open in browser
open index.html
```

## Project Structure

```
2048/
├── index.html      # Main HTML file
├── styles.css      # Styling and animations
├── script.js       # Game logic
└── README.md       # This file
```

## Game Mechanics

### Tile Values and Colors

- **2** - Light beige (#eee4da)
- **4** - Tan (#ede0c8)
- **8** - Orange (#f2b179)
- **16** - Coral (#f59563)
- **32** - Salmon (#f67c5f)
- **64** - Red (#f65e3b)
- **128** - Yellow (#edcf72)
- **256** - Gold (#edcc61)
- **512** - Amber (#edc850)
- **1024** - Dark yellow (#edc53f)
- **2048** - Victory gold (#edc22e)

### Animations

- **Pop Animation**: New tiles appear with a scale and opacity effect
- **Merge Animation**: Merged tiles shake and scale for visual feedback
- **Color Transitions**: Smooth color transitions on tile changes (1s duration)
- **Background Transition**: Dynamic background color based on highest tile (1.2s duration)

## Technical Details

- Pure vanilla JavaScript (no frameworks)
- CSS Grid for layout
- CSS animations and transitions
- Responsive design with viewport units
- Modern ES6+ JavaScript features

## Browser Compatibility

Works on all modern browsers that support:
- CSS Grid
- ES6 JavaScript
- CSS Animations
- CSS Transitions

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

MIT License - feel free to use this project for learning or personal use.

## Credits

Inspired by the original 2048 game created by Gabriele Cirulli.
