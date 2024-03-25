# My Task

Este proyecto contiene los elementos solicitados en la prueba técnica para myHotel presentado por Jorge Pineda Montagut. Para esta, se escogió como modelo o tematica a seguir "tareas a realizar" donde se tuvieron en cuenta los campos:


- id
- title (nombre de la tarea)
- descripcion (Opcional)
- when (fecha en la que realizará la tarea)
- where (lugar donde se estaría haciendo la tarea)
- priority (prioridad de la tarea. Se representa con el código de colores indicados en la prueba)
- withWho (arreglo de nombre de personas)
- isDone (estado de la tarea)


Al correr la aplicación, realizada con la versión 15.2.10 de Angular, con el comando `ng serve` para ambiente de desarrollo y al navegar en `http://localhost:4200/`, debe visualizarse el listado de tareas con registros moqueados en código. En esta ventana se presentan los accesos para realizar las acciones de crear, modificar y eliminar, además de una opción para ver detalle de cada registro listado.


El listado presentado puede ser filtrado a través del campo de texto ubicado en la parte superior de la ventana. Junto a esto, las columnas presentadas en el listado se pueden ordenar al presionar sobre las cabeceras de cada columna, a excepción de la coluna Actions.


El formulario de registro de tareas implementa Reactive forms.


Se creó la directiva howLongAgoWasTheDate para representar la diferencia en días de la fecha de realización de una tarea. Esto puede ser visualizado en la columna When del listado de tareas y puede visualizarse la fecha en el formato indicado en la descripción de la prueba al pasar el mouse sobre los valores de esa columna.


Todo el código y comentarios en esta aplicación esta en inglés.


La aplicación hace uso del paquete NGXS para el manejo de estado incluyendo elementos como Actions, States y Selectors. Con lo anterior, se dejó integrado @ngxs/logger-plugin para que puedan mirar facilmente en la consola del navegador el manejo del estado logrado. 


Para los componentes visuales se usó Material angular y se utilizaron algunas utilidades CSS de Tailwind.

