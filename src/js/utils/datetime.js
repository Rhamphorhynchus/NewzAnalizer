export function formatDate(date) {
 
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yyyy = date.getFullYear();
      
    return yyyy + '-' + mm + '-' + dd;
}

export function formatDateAsLongString(date) {
    const months = {
        nominative: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
        accusative: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    }

    return `${date.getDate()} ${months.accusative[date.getMonth()]}, ${date.getFullYear()}`;
}

export function formatDateAsShortString(date) {
    const weekdaysShort = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return `${date.getDate()}, ${weekdaysShort[date.getDay()]}`;
}