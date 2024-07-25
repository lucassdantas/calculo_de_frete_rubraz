-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/07/2024 às 17:17
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `rubraz`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `rubraz_users`
--

CREATE TABLE `rubraz_users` (
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userEmail` varchar(255) NOT NULL,
  `userCpfOrCnpj` varchar(255) NOT NULL,
  `userPhone` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userHasImage` tinyint(1) NOT NULL DEFAULT 0,
  `userDateOfCreation` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `rubraz_users`
--

INSERT INTO `rubraz_users` (`userId`, `userName`, `userEmail`, `userCpfOrCnpj`, `userPhone`, `userPassword`, `userHasImage`, `userDateOfCreation`) VALUES
(1, 'Lucas Dantas', 'teste@teste.com', '000000000000055555', '2122222', '$2y$10$ABEgnwO.WaFHYup82RDZ8.9eHSCRMF68jg.eUua7wV3NOeTMGcnh.', 0, '2024-07-25 08:23:16'),
(2, 'Lucas', 'lucasdantasprogramador@gmail.com', '000000', '21', '$2y$10$x5rl7/wUoBHStQvVUT/dOOHz5G265kDC5J0XEZrZMlAFtqzjqcfja', 0, '2024-07-25 10:24:30'),
(3, 'Lucas', 'lucas.dantas@rdexclusive.com.br', '33333', '21', '$2y$10$SoTl0yVXEdis7Fhgsvipue4cJ2AT1FgRIk/fL8erjvML06op0vvf6', 0, '2024-07-25 10:26:45');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`login`, `password`) VALUES
('teste@teste.com', 'teste');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `rubraz_users`
--
ALTER TABLE `rubraz_users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `rubraz_users`
--
ALTER TABLE `rubraz_users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
