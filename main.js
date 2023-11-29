import { createButton } from './createButton';
import { fetchData } from './fetch';
import { filterUsers } from './filterUsers';
import { renderTableBody } from './renderTable';
import './style.css'

const table = document.getElementById('table');
const tableTbody = document.querySelector('#table tbody');
const selectCategories = document.querySelector('#categories');
const usersPerPage = 10;
let currentPage = 1;
let currentPageActive;
let filteredUsers = [];

const updatePaginator = ( currentPage, noOfPages ) => {
  renderButtons( noOfPages );
}

const renderButtons = ( noOfPages ) => {
  const containerButtons = document.createElement('DIV');
  containerButtons.classList.add(
    'buttons',
    'px-5',
    'py-5',
    'bg-white',
    'border-t',
    'flex',
    'flex-col',
    'xs:flex-row', 
    'items-center', 
    'xs:justify-between'
  );

  const flexButtons = document.createElement('DIV');
  flexButtons.classList.add('inline-flex', 'mt-2', 'xs:mt-0');
  
  const nextButton = createButton('Next', () => {
    if( currentPage < noOfPages ) {
      handlePageChange(currentPage + 1)
    }
  });
  
  const prevButton = createButton('Prev', () => {
    if( currentPage > 1 ) {
      handlePageChange(currentPage - 1)
    }
  });

  // Valida si ya existen los botones
  const buttons = document.querySelector('.buttons');
  if( buttons ) {
    buttons.remove()
  }

  if( currentPage === 1 ) {
    prevButton.disabled = true;
    prevButton.classList.add('hidden');
  } else if( currentPage === 3000 ) {
    nextButton.disabled = true;
    nextButton.classList.add('hidden');
  }

  currentPageActive = document.createElement('SPAN');
  currentPageActive.classList.add('text-xs', 'xs:text-sm', 'text-gray-900');
  updatePageInfo( noOfPages );

  table.parentElement.appendChild( containerButtons );
  containerButtons.append(currentPageActive, flexButtons);
  flexButtons.append( prevButton, nextButton );
};

const updatePageInfo = ( noOfPages ) => {
  currentPageActive.innerText = `Página ${currentPage} de ${noOfPages}`;
};

const renderData = async (selectedCategory = 'all') => {
  const users = await fetchData();
  
  // Filtra los usuarios según la categoría seleccionada
  filteredUsers = filterUsers(users, selectedCategory);

  // Aplica paginación a los usuarios filtrados
  const startIdx = (currentPage - 1) * usersPerPage;
  const endIdx = startIdx + usersPerPage;
  const userToShow = filteredUsers.slice(startIdx, endIdx);

  // Renderiza la tabla con los usuarios filtrados
  renderTableBody(userToShow, tableTbody);

  // Actualiza el paginador
  updatePaginator(currentPage, Math.ceil(filteredUsers.length / usersPerPage));
};

selectCategories.addEventListener('change', (e) => {
  const selectedCategory = e.target.value;
  currentPage = 1; // Reinicia la página al cambiar la categoría
  renderData(selectedCategory)
  
})

// Añade la función para manejar el cambio de página
const handlePageChange = (newPage) => {
  currentPage = newPage;
  const startIdx = (currentPage - 1) * usersPerPage;
  const endIdx = startIdx + usersPerPage;
  const userToShow = filteredUsers.slice(startIdx, endIdx);
  renderTableBody(userToShow, tableTbody);
  updatePaginator(currentPage, Math.ceil(filteredUsers.length / usersPerPage));
};

renderData();