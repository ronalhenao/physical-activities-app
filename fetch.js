export const fetchData = async() => {
  try {
    const response = await fetch('./api/data.json');
    if( response.status === 200 ) {
      const result = await response.json();
      return result.data;
    } else {
      throw new Error(`Error al cargar los datos: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
  return [];
}