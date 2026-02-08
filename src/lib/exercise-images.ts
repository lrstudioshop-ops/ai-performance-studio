// Exercise images mapping - uses placeholder images based on exercise type
// In a real app, these would be actual image URLs

export const exerciseImages: Record<string, string> = {
  // Fitness / Fuerza
  'fit1': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop', // Press de Banca
  'fit2': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop', // Sentadilla
  'fit3': 'https://images.unsplash.com/photo-1598268030450-5d5579d5e760?w=400&h=300&fit=crop', // Peso Muerto
  
  // CrossFit / Potencia
  'cf1': 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=300&fit=crop', // Burpees
  'cf2': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop', // Box Jumps
  'cf3': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=300&fit=crop', // Wall Balls
  
  // Running / Velocidad
  'run1': 'https://images.unsplash.com/photo-1461896836934- voices-of-freedom?w=400&h=300&fit=crop', // Intervalos
  'run2': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop', // Carrera Continua
  
  // Natación
  'nat1': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop', // Crol
  'nat2': 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=400&h=300&fit=crop', // Series
  
  // Yoga / Movilidad
  'yog1': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop', // Saludo al Sol
  'yog2': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop', // Guerrero
  
  // Ciclismo
  'cic1': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop', // Intervalos
  'cic2': 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop', // Rodaje
  
  // Genéricos
  'gen1': 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=300&fit=crop', // Plancha
  'gen2': 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=300&fit=crop', // Dominadas
  'gen3': 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&h=300&fit=crop', // Zancadas
  
  // Nuevos ejercicios expandidos
  'res1': 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop', // Burpees
  'res2': 'https://images.unsplash.com/photo-1517130038641-a774d04afb3c?w=400&h=300&fit=crop', // Mountain Climbers
  'res3': 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=400&h=300&fit=crop', // Jumping Jacks
  'res4': 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400&h=300&fit=crop', // Remo en Máquina
  
  'vel1': 'https://images.unsplash.com/photo-1461897104016-0b3b00b1ea33?w=400&h=300&fit=crop', // Sprints
  'vel2': 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop', // Skipping
  'vel3': 'https://images.unsplash.com/photo-1590239926044-4131f5d0654d?w=400&h=300&fit=crop', // Escalera de Agilidad
  'vel4': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop', // Saltos Laterales
  
  'pot1': 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=300&fit=crop', // Clean & Jerk
  'pot2': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=300&fit=crop', // Snatch
  'pot3': 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=400&h=300&fit=crop', // Kettlebell Swing
  'pot4': 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop', // Medicine Ball Slam
  
  'mov1': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop', // Estiramientos Dinámicos
  'mov2': 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop', // Foam Rolling
  'mov3': 'https://images.unsplash.com/photo-1573384666979-2571d864ffb4?w=400&h=300&fit=crop', // Movilidad de Cadera
  'mov4': 'https://images.unsplash.com/photo-1562771379-eafdca7a02f8?w=400&h=300&fit=crop', // Yoga Flow
  
  'rec1': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop', // Caminata Suave
  'rec2': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop', // Respiración Profunda
  'rec3': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop', // Estiramientos Estáticos
  'rec4': 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400&h=300&fit=crop', // Masaje con Rodillo
};

// Get image URL for an exercise, with fallback
export const getExerciseImage = (exerciseId: string, category?: string): string => {
  if (exerciseImages[exerciseId]) {
    return exerciseImages[exerciseId];
  }
  
  // Fallback images by category
  const categoryFallbacks: Record<string, string> = {
    fuerza: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    resistencia: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop',
    velocidad: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop',
    potencia: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=300&fit=crop',
    movilidad: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    recuperacion: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=300&fit=crop',
  };
  
  if (category && categoryFallbacks[category]) {
    return categoryFallbacks[category];
  }
  
  // Default fallback
  return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop';
};
