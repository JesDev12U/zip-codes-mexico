<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit_form'])) {
    include 'db/connection.php';

    // Preparar la consulta SQL con valores de parámetros
    $stmt = $conn->prepare("INSERT INTO registers VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)");

    // Asignar los parámetros a la consulta preparada
    $stmt->bind_param("sssssss", $_POST['cp'], $_POST['state'], $_POST['zone'], $_POST['colony'], $_POST['street'], $_POST['ext_num'], $_POST['in_num']);

    // Ejecutar la consulta
    $stmt->execute();

    // Comprobar si la inserción no tuvo éxito
    if ($stmt->affected_rows === 0) {
        echo <<<HEADOC
            <script>
                alert('Error al guardar los datos');
            </script>
        HEADOC;
    } else {
        header('Location: index.html');
        exit();
    }

    // Cerrar la declaración y la conexión
    $stmt->close();
    $conn->close();
}
