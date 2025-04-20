<?php
include 'db/conexao.php';

session_start();
if (!isset($_SESSION['nome'])) {
    header("Location: login.php");
    exit;
}

$conn = new mysqli('localhost', 'root', '', 'api');
$nome = $_SESSION['nome'];
$nivel = $_SESSION['nivel'];

// Busca a foto do usuário
$sql = "SELECT foto, nivel FROM usuarios WHERE nome = '$nome'";
$result = $conn->query($sql);
$usuario = $result->fetch_assoc();
$foto = $usuario['foto'];
$nivel = $usuario['nivel'];




$mensagem = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $materia_id = $_POST['materia'] ?? '';
    $titulo = $_POST['titulo'] ?? '';
    $subtitulo = $_POST['subtitulo'] ?? '';
    $conteudo = $_POST['conteudo'] ?? '';
    $imagem = $_FILES['imagem'] ?? null;

    if ($materia_id && $titulo && $subtitulo && $conteudo && $imagem) {
        $nomeImagem = uniqid() . "-" . basename($imagem['name']);
        $caminhoImagem = "uploads/" . $nomeImagem;

        if (move_uploaded_file($imagem['tmp_name'], $caminhoImagem)) {
            $sql = $conn->prepare("INSERT INTO postagens (materia_id, titulo, subtitulo, conteudo, imagem, status) 
                                   VALUES (?, ?, ?, ?, ?, 'pendente')");
            $sql->bind_param("issss", $materia_id, $titulo, $subtitulo, $conteudo, $nomeImagem);

            if ($sql->execute()) {
                $mensagem = "Postagem enviada para análise!";
            } else {
                $mensagem = "Erro ao salvar no banco de dados.";
            }
        } else {
            $mensagem = "Erro ao enviar imagem.";
        }
    } else {
        $mensagem = "Preencha todos os campos!";
    }
}

// buscar matérias
$materias = $conn->query("SELECT id, nome FROM materias ORDER BY nome ASC");
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Criar Postagem</title>
    <link rel="stylesheet" href="./assets/css/criar_postagem.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Sigmar&display=swap"
        rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;

        }

        html {
            width: 100%;
            height: 100%;
        }

        body {
            overflow-x: hidden;
        }

        header {
            width: 100%;
            height: 70px;
            background-color: #000330;
            padding: 10px 0;
            box-shadow: 0 4px 6px rgba(35, 34, 34, 0.375);
            /* position: fixed; */
        }

        .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: white;
            animation: move 5s linear infinite;
            opacity: 0, 5;
            z-index: 1;

        }

        @keyframes move {
            0% {
                transform: scale(1);
                opacity: 1;
            }

            100% {
                transform: scale(0);
                opacity: 0;
            }
        }

        nav {
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 1300px;
            margin: 0 auto;
            /* padding: 0 20px; */
            margin-top: 7.5px;
        }

        .nav-list {
            list-style: none;
            display: flex;
            gap: 40px;
            padding: 0;
            margin: 0;

        }

        .logo {
            background-color: #000330;
            z-index: 2;
        }

        .nav-list h3 {
            color: #ffffff;
            font-family: "Sigmar", sans-serif;
            font-weight: 100;
            font-size: 22px;
        }

        .nav-list p {
            color: red;
            font-family: "Caveat", cursive;
            font-optical-sizing: auto;
            font-weight: 700;
            letter-spacing: 4px;
            font-size: 19px;
            margin-left: 5px;
        }

        .nav-list li {
            /* display: inline; */
            width: 80px;
            height: 25px;
            background-color: #000330;
            z-index: 2;
            margin-top: 10px;
        }

        a {
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            text-decoration: none;
            color: #ffffff;
            font-weight: bold;
            padding: 10px 15px;
            transition: 0.3s;
            /* transition: color 0.3s, background-color 0.3s; */
        }

        a:hover {
            /* background-color: #000;
    border-radius: 5px; */
            opacity: 0.7;
        }

        .tudo {
            width: 90%;
            height: auto;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
        }

        main {
            width: 100%;
            height: 100%;
        }

        .tudo {
            width: 90%;
            margin-left: 45px;

        }

        .usuario {
            width: 30%;
            height: auto;
            border: none;
            margin-left: 10%;
            margin-bottom: 30%;
        }
        .foto #fotoperfil {
            width: 200px;
            height: 200px;
            border-radius: 50%;
        }

        .info {
            margin-top: 0;
            width: 90%;
            display: block;
            margin: 0 30px;
            /* display: flex;
            justify-content: center;
            align-items: center; */
        }

        .info hr {
            width: 70%;
            height: 2px;
            background-color: #002a77;
        }

        .info p {
            margin: 0;
            border: none;
            font-size: 40px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }

        .info #nivel {
            font-size: 15px;
            background-color: #002a77;
            color: #fff;
            width: 100px;
            border-radius: 10px;
            text-align: center;
            padding: 5px;
            margin-left: 3%;
        }

        .formulario {
            width: 60%;
            border: 1px solid #002a77;
            margin: 30px auto;
            background: white;
            padding: 25px;
            border-radius: 10px;
        }

        .formulario button {
            width: 100%;
            background: #002a77;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }

        .formulario button:hover {
            background: #1b386e;
        }

        h2 {
            font-size: 25px;
            color: #002a77;
            font-family: Arial, Helvetica, sans-serif;
        }

        .formulario select {
            max-width: 200px;
        }

        .formulario input,
        .formulario select,
        .formulario textarea {
            width: 95%;
            padding: 10px;
            margin-top: 5px;
            border-radius: 6px;
            border: 2px solid #000330;

        }

        .formulario label {
            display: block;
            margin-top: 15px;
            text-align: left;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        }

        .mensagem {
            font-family: 'Courier New', Courier, monospace;
            /* text-align: center; */
            color: green;
            font-weight: bold;
            margin-top: 20px;
        }

        .voltar button {
            font-size: 30px;
            border: none;
            padding: 10px;
            margin: 10px 50px;
            transition: 0.3s ease-in-out;
            cursor: pointer;
            background-color: #fff;
            height: 20px;
        }
        .voltar button:hover{
            transform: scale(1.02);
        }
    </style>
</head>

<body>
    <header>
        <nav>
            <div class="imagem">
            </div>
            <ul class="nav-list">
                <li>
                    <a href="#" onclick="abrir()" class="menu-button">MENU</a>
                </li>
                <li><a href="home.php">HOME</a></li>

                <div class="logo">
                    <h3>EDUCA</h3>
                    <p id="insider">insider</p>
                    <!-- <img src="" alt="livro">  -->
                </div>

                <li><a href="perfil.php">PERFIL</a></li>
                <li><a href="mostrar_livro.php">LIVROS</a></li>
            </ul>
        </nav>
    </header>
    <main>

    <div class="voltar">
            <button type="submit" onclick="voltar()"><i class="bi bi-arrow-left-circle-fill"></i></button>
        </div>
        <section class="tudo">
            <section class="usuario">
                <div class="foto">
                    <?php if ($foto): ?>
                        <img id="fotoperfil" src="<?php echo $foto; ?>" alt="Foto de Perfil">
                    <?php endif; ?>
                </div>
                <div class="info">
                    <p> <?php echo $_SESSION['nome']; ?></p>
                    <p id="nivel"> Nível: <?= htmlspecialchars($nivel) ?></p>

                </div>

            </section>

            <!-- <div class="divisao"></div> -->


            <div class="formulario">
                <h2>Criar Nova Postagem</h2>
                <?php if ($mensagem): ?>
                    <p class="mensagem"><?= $mensagem ?></p>
                <?php endif; ?>
                <form method="post" enctype="multipart/form-data">
                    <label for="materia">Matéria:</label>
                    <select name="materia" required>
                        <option value="">Selecione</option>
                        <?php while ($m = $materias->fetch_assoc()): ?>
                            <option value="<?= $m['id'] ?>"><?= $m['nome'] ?></option>
                        <?php endwhile; ?>
                    </select>

                    <label for="titulo">Título:</label>
                    <input type="text" name="titulo" required>

                    <label for="subtitulo">Subtítulo:</label>
                    <input type="text" name="subtitulo" required>

                    <label for="conteudo">Conteúdo:</label>
                    <textarea name="conteudo" rows="8" required></textarea>

                    <label for="imagem">Imagem:</label>
                    <input type="file" name="imagem" accept="image/*" required>

                    <button type="submit">Criar Postagem</button>
                </form>
            </div>
        </section>
        
    </main>

    <script>
        for (let i = 0; i < 1000; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            document.querySelector('header').appendChild(star); // ✅ Agora as estrelas estão no header
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 84}px`; // 🔹 Mantém as estrelas dentro da altura do header
            star.style.width = `${Math.random() * 2 + 0.1}px`;
            star.style.height = star.style.width;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        }

        document.header.style.backgroundColor = "#000330";

        function voltar() {
            window.location.href = "perfil.php"
        }
    </script>
</body>

</html>