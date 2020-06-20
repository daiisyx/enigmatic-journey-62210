const display = document.getElementById('display');
const dim1 = display.getContext('2d'); // 2-dimentional
dim1.fillStyle = 'green';
dim1.fillRect(0, 0, 100, 100);
const dim2 = display.getContext('2d'); 
dim2.fillStyle = 'red'; 
dim2.fillRect(100, 100, 100, 100);