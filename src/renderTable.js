export const renderTableBody = (users, tableTbody) => {
  let renderHTML = '';
  users.forEach(user => {
    const {
      Id, 
      UserId, 
      StartTimeInSeconds, 
      DurationInSeconds, 
      DistanceInMeters, 
      Steps, 
      AverageSpeedInMetersPerSecond, 
      AveragePaceInMinutesPerKilometer, 
      TotalElevationGainInMeters, 
      AverageHeartRateInBeatsPerMinute,
      isSuspicious,
    } = user;
    renderHTML += `
      <tr>
        <td class="p-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${ UserId }</p>
        </td>
        <td class="p-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${ StartTimeInSeconds }</p>
        </td>
        <td class="p-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${ DurationInSeconds }</p>
        </td>
        <td class="p-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${ DistanceInMeters }</p>
        </td>
        <td class="p-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${ Steps }</p>
        </td>
        <td class="p-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${ AverageSpeedInMetersPerSecond }</p>
        </td>
        <td class="p-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${ AveragePaceInMinutesPerKilometer }</p>
        </td>
        <td class="p-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${ TotalElevationGainInMeters }</p>
        </td>
        <td class="p-5 border-b border-gray-200 bg-white text-sm">
          <p class="text-gray-900 whitespace-no-wrap">${ AverageHeartRateInBeatsPerMinute }</p>
        </td>

        <td class=" status p-5 border-b border-gray-200 bg-white text-sm ${isSuspicious ? 'text-red-500' : 'text-green-500'}">
          <span class="relative inline-block px-3 py-1 leading-tight">
            <span aria-hidden class="absolute inset-0 ${isSuspicious ? 'bg-red-200' : 'bg-green-200'} opacity-50 rounded-full"></span>
            <p class="relative font-semibold ${isSuspicious ? 'text-red-900' : 'text-green-900'}">${isSuspicious ? 'Sospechoso' : 'Normal'}</p>
          </span>
        </td>
        
      </tr>
    `;
  });
  tableTbody.innerHTML = renderHTML;
}