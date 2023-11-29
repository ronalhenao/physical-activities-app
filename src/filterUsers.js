export const filterUsers = (users, selectedCategory) => {
  // Umbrales
  const paceThreshold = 5; // minutos por kilómetro - Umbral hipotético
  const elevationGainPerMinuteThreshold = 3; // metros por minuto - Umbral hipotético

  // Filtra los usuarios sospechosos y guarda el resultado en un array
  const suspiciousUsers = users.filter(user => {
    // Cálculo del ritmo medio
    const averagePaceInMinutesPerKilometer = user.AveragePaceInMinutesPerKilometer;
    const isSuspiciousPace = averagePaceInMinutesPerKilometer < paceThreshold;

    // Cálculo elevación ganada por minuto
    const totalElevationGainInMeters = user.TotalElevationGainInMeters;
    const durationInSeconds = user.DurationInSeconds;
    const elevationGainPerMinute = totalElevationGainInMeters / (durationInSeconds / 60);
    const isSuspiciousElevation = elevationGainPerMinute > elevationGainPerMinuteThreshold;

    // Verificación de duración prolongada y distancia excesiva
    const distanceInMeters = user.DistanceInMeters;
    const isSuspiciousDuration = durationInSeconds > 3 * 60 * 60; // Duración mayor a 3 horas
    const isSuspiciousDistance = distanceInMeters > 50000; // Distancia mayor a 50 km

    // Modificar el usuario para reflejar si es sospechoso o no
    user.isSuspicious = isSuspiciousPace || isSuspiciousElevation || isSuspiciousDuration || isSuspiciousDistance;

    return user.isSuspicious;
  });

  // Aplicar el filtro según la categoría seleccionada
  if (selectedCategory === 'actividad-normal') {
    return users.filter(user => !user.isSuspicious);
  } else if (selectedCategory === 'actividad-sospechosa') {
    return suspiciousUsers;
  } else {
    // Si la categoría es 'all', no se realiza ningún filtro adicional
    return users;
  }
}