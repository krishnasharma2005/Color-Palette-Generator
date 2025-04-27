import { useState } from 'react';

export default function ColorPaletteGenerator() {
  const [baseColors, setBaseColors] = useState(['#ff9aa2']);
  const [palette, setPalette] = useState([]);
  const [copiedColor, setCopiedColor] = useState(null);

  // Function to add a new base color input
  const addBaseColor = () => {
    if (baseColors.length < 5) {
      // Adding a new pastel color by default
      const pastelDefaults = ['#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea'];
      const nextColor = pastelDefaults[baseColors.length - 1] || '#c7ceea';
      setBaseColors([...baseColors, nextColor]);
    }
  };

  // Function to remove a base color
  const removeBaseColor = (index) => {
    if (baseColors.length > 1) {
      const newColors = [...baseColors];
      newColors.splice(index, 1);
      setBaseColors(newColors);
    }
  };

  // Function to update a base color
  const updateBaseColor = (index, value) => {
    const newColors = [...baseColors];
    newColors[index] = value;
    setBaseColors(newColors);
  };

  // Function to generate related color palette
  const generatePalette = () => {
    let generatedPalette = [];

    // Add base colors to palette
    generatedPalette = [...baseColors];

    // Generate related colors for each base color
    baseColors.forEach(color => {
      // Convert hex to RGB
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);

      // Generate lighter shade (25% lighter)
      const lighterShade = rgbToHex(
        Math.min(255, Math.floor(r + (255 - r) * 0.25)),
        Math.min(255, Math.floor(g + (255 - g) * 0.25)),
        Math.min(255, Math.floor(b + (255 - b) * 0.25))
      );

      // Generate darker shade (25% darker)
      const darkerShade = rgbToHex(
        Math.floor(r * 0.75),
        Math.floor(g * 0.75),
        Math.floor(b * 0.75)
      );

      // Generate complementary color
      const complementary = rgbToHex(255 - r, 255 - g, 255 - b);

      // Add generated colors if they're not already in the palette
      [lighterShade, darkerShade, complementary].forEach(newColor => {
        if (!generatedPalette.includes(newColor)) {
          generatedPalette.push(newColor);
        }
      });
    });

    setPalette(generatedPalette);
  };

  // Helper function to convert RGB to hex
  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  // Function to copy color to clipboard
  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    
    // Reset copy confirmation after 2 seconds
    setTimeout(() => {
      setCopiedColor(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Large color circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pink-100 opacity-50 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-100 opacity-50 -ml-20 -mb-20"></div>
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-yellow-100 opacity-40"></div>
        <div className="absolute top-3/4 right-1/4 w-56 h-56 rounded-full bg-green-100 opacity-40"></div>
        
        {/* Small decorative dots */}
        <div className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-purple-300 opacity-60"></div>
        <div className="absolute top-2/3 left-1/3 w-4 h-4 rounded-full bg-pink-300 opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 rounded-full bg-blue-300 opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full bg-green-300 opacity-60"></div>
        
        {/* Wavy lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,128 C100,100 200,180 300,128 C400,80 500,160 600,128 C700,100 800,180 900,128 C1000,80 1100,160 1200,128 L1200,0 L0,0 Z" 
                fill="#d8b4fe" />
          <path d="M0,384 C100,356 200,436 300,384 C400,336 500,416 600,384 C700,356 800,436 900,384 C1000,336 1100,416 1200,384 L1200,256 L0,256 Z" 
                fill="#a5f3fc" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-pink-100 relative z-10">
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-80 z-0"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-200 to-green-200 opacity-80 z-0"></div>
        
        <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 relative z-10">
          Color Palette Generator
        </h1>
        
        {/* Base color selection */}
        <div className="mb-8 bg-blue-50 bg-opacity-80 p-6 rounded-xl border-2 border-blue-100 relative">
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-200"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-blue-300"></div>
          
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Select Base Colors</h2>
          <div className="space-y-4">
            {baseColors.map((color, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateBaseColor(index, e.target.value)}
                    className="h-12 w-20 cursor-pointer rounded-lg border-2 border-gray-200"
                  />
                </div>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => updateBaseColor(index, e.target.value)}
                  className="border-2 border-gray-200 rounded-lg px-3 py-2 w-32 font-mono bg-white"
                />
                {baseColors.length > 1 && (
                  <button
                    onClick={() => removeBaseColor(index)}
                    className="bg-red-400 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition-colors shadow-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            {baseColors.length < 5 && (
              <button
                onClick={addBaseColor}
                className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors shadow-sm"
              >
                Add Color
              </button>
            )}
            
            <button
              onClick={generatePalette}
              className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-pink-500 hover:to-purple-600 transition-colors shadow-sm font-medium"
            >
              Generate Palette
            </button>
          </div>
        </div>
        
        {/* Generated palette display */}
        <div className="relative">
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-purple-200"></div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-pink-200"></div>
          
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Generated Palette</h2>
          
          {palette.length === 0 ? (
            <div className="bg-yellow-50 bg-opacity-80 p-8 rounded-xl text-center border-2 border-yellow-100">
              <p className="text-gray-600">
                Select base colors and click "Generate Palette" to see colors here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:scale-105 duration-300"
                >
                  <div
                    className="h-28 w-full cursor-pointer flex items-center justify-center"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                  >
                    {copiedColor === color && (
                      <div className="bg-white bg-opacity-80 px-3 py-1 rounded-lg font-medium">
                        Copied!
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50">
                    <span className="font-mono text-gray-700">{color}</span>
                    <button
                      onClick={() => copyToClipboard(color)}
                      className="bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded-lg text-purple-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm relative z-10">
        Made with ❤️ for color lovers
      </div>
    </div>
  );
}
