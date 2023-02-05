def default_alignment(string_a: str, string_b: str, costs_matrix: list, gap_penalty: int, alphabet_to_ind: dict):
    """
    Algoritmo padrão

    Roda o alinhamento de sequência numa matriz de Dynamic Programming
    de mismatches e gaps. Utiliza maximização ao invés de minimização. Ou seja, o
    custo ótimo que é mais beneficial é o maior.

    Somente será chamada com quando a recursão alcança N ou M = 1,
    ou seja, considerando duas linhas (atual e antiga)

    :arg string_a Primeira String
    :arg string_b Segunda String
    :arg costs_matrix Matriz quadrada dos custos de substituição para cada par de caractére
    :arg gap_penalty Custo de inserir gaps (negativo) para ser mais custoso que a troca
    :arg alphabet_to_ind Mapeamento de cada letra para seu índice na matriz quadrada costs_matrix
    :returns [string_editada_a, string_editada_b, custo_de_edição]
    """

    n, m = len(string_a), len(string_b)
    dp = []
    for i in range(n + 1):
        dp.append([0] * (m + 1))  # preenche matriz (2 linhas) com zeros (m + 1 colunas)
    for j in range(m + 1):
        dp[0][j] = gap_penalty * j  # Inicializa DP para len(A) = 0 -> custo do gap de j caractéres em A
    for i in range(n + 1):
        dp[i][0] = gap_penalty * i  # Inicializa DP para len(B) = 0 -> custo do gap de i caractéres em B

    for i in range(1, n + 1):  # DP para cada subproblema, começando do primeiro caractére de cada string
        for j in range(1, m + 1):
            dp[i][j] = max(  # Algoritmo escolhe o valor maximizado como ótimo.
                dp[i - 1][j - 1] + costs_matrix[alphabet_to_ind[string_a[i - 1]]][alphabet_to_ind[string_b[j - 1]]],
                # Match (volta ambos o caractéres) + custo de substituir Ai por Bj
                dp[i][j - 1] + gap_penalty,  # Gap em A
                dp[i - 1][j] + gap_penalty)  # Gap em B

    # Strings de subresposta é retornada para cada chamada a default_alignment
    result_a = ""
    result_b = ""
    i, j = n, m  # Back-track dos custos para formar a sub-solução
    while i and j:
        score, score_replace, score_gap_b, score_gap_a = dp[i][j], dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]

        # Compara score atual para saber qual foi o caminho tomado
        if score == score_replace + costs_matrix[alphabet_to_ind[string_a[i - 1]]][alphabet_to_ind[string_b[j - 1]]]:
            result_a = string_a[i - 1] + result_a  # Como começa pelo fim, insere caractére no início da sub-solução
            result_b = string_b[j - 1] + result_b
            i -= 1
            j -= 1
        elif score == score_gap_b + gap_penalty:
            result_a = string_a[i - 1] + result_a
            result_b = '-' + result_b
            i -= 1
        elif score == score_gap_a + gap_penalty:
            result_a = '-' + result_a
            result_b = string_b[j - 1] + result_b
            j -= 1

    # A partir do que não chegou ao início, inserir Gaps na outra String
    # e inserir os caractéres faltosos
    while i:
        result_a = string_a[i - 1] + result_a
        result_b = '-' + result_b
        i -= 1
    while j:
        result_a = '-' + result_a
        result_b = string_b[j - 1] + result_b
        j -= 1

    return [result_a, result_b, dp[n][m]]


def forwards(string_x: str, string_y: str, costs_matrix: list, gap_penalty: int, alphabet_to_ind: dict):
    """
    Retorna somente o resultado otimizado de uma sub-solução

    :param string_x: Primeira string
    :param string_y: Segunda string
    :arg costs_matrix Matriz quadrada dos custos de substituição para cada par de caractére
    :arg gap_penalty Custo de inserir gaps (negativo) para ser mais custoso que a troca
    :arg alphabet_to_ind Mapeamento de cada letra para seu índice na matriz quadrada costs_matrix
    ::returns dp_current > list(int)
    """
    n, m = len(string_x), len(string_y)
    dp = []
    for i in range(n + 1):
        dp.append([0] * (m + 1))
    for j in range(m + 1):
        dp[0][j] = gap_penalty * j
    for i in range(1, n + 1):
        dp[i][0] = dp[i - 1][0] + gap_penalty
        for j in range(1, m + 1):   # Começa de 1
            dp[i][j] = max(
                dp[i - 1][j - 1] + costs_matrix[alphabet_to_ind[string_x[i - 1]]][alphabet_to_ind[string_y[j - 1]]],
                dp[i - 1][j] + gap_penalty,
                dp[i][j - 1] + gap_penalty)

        # Após utilizar, remove linha da memória
        dp[i - 1] = []
    return dp[n]


def backwards(string_x: str, string_y: str, costs_matrix: list, gap_penalty: int, alphabet_to_ind: dict):
    """
    Retorna somente o resultado otimizado de uma sub-solução

    :param string_x: Primeira string
    :param string_y: Segunda string
    :arg costs_matrix Matriz quadrada dos custos de substituição para cada par de caractére
    :arg gap_penalty Custo de inserir gaps (negativo) para ser mais custoso que a troca
    :arg alphabet_to_ind Mapeamento de cada letra para seu índice na matriz quadrada costs_matrix
    :returns dp_current > list(int)
    """
    n, m = len(string_x), len(string_y)
    dp = []
    for i in range(n + 1):
        dp.append([0] * (m + 1))
    for j in range(m + 1):
        dp[0][j] = gap_penalty * j
    for i in range(1, n + 1):
        dp[i][0] = dp[i - 1][0] + gap_penalty
        for j in range(1, m + 1):   # Começa de n - 1
            dp[i][j] = max(
                dp[i - 1][j - 1] + costs_matrix[alphabet_to_ind[string_x[n - i]]][alphabet_to_ind[string_y[m - j]]],
                dp[i - 1][j] + gap_penalty,
                dp[i][j - 1] + gap_penalty)

        # Após utilizar, remove linha da memória
        dp[i - 1] = []
    return dp[n]


def hirschberg(string_a: str, string_b: str, costs_matrix: list, gap_penalty: int, alphabet_to_ind: dict):
    """
    Algoritmo de Hirschberg utiliza umma matriz de tamanho 2 para computar somente os passos atual e antigo, já que,
    na DP, utiliza-se somente a linha de cima para comparação.

    Para a reconstrução da solução sem precisar de uma matriz, é aplicada um algoritmo de dividir e conquistar que
    vai do começo até o meio das palavras e do final até o meio.

    :arg string_a Primeira string
    :arg string_b Segunda string
    :arg costs_matrix Matriz quadrada dos custos de substituição para cada par de caractére
    :arg gap_penalty Custo de inserir gaps (negativo) para ser mais custoso que a troca
    :arg alphabet_to_ind Mapeamento de cada letra para seu índice na matriz quadrada costs_matrix
    :returns [string_editada_a, string_editada_b, custo_de_edição]
    """
    n, m = len(string_a), len(string_b)
    if n < 2 or m < 2:
        # Somnete para uma das string com tamanho 1
        print('default_alignment len(X) = {}, len(Y) = {}'.format(n, m))
        return default_alignment(string_a, string_b, costs_matrix, gap_penalty, alphabet_to_ind)
    else:
        # Divisão da solução
        # somente dividimos a string A pois ela determina o limite dos loops
        f_result, b_result = forwards(string_a[:n // 2], string_b, costs_matrix, gap_penalty, alphabet_to_ind), \
            backwards(string_a[n // 2:], string_b, costs_matrix, gap_penalty, alphabet_to_ind)

        print('Hirshbeg Split: ', f_result, b_result)

        partition = [f_result[j] + b_result[m - j] for j in range(m + 1)]

        print('Extremes sum: len(X) = {}, len(Y) = {}'.format(n, m), partition)
        cut = partition.index(max(partition))   # Índice do maior resultado para chamada recursiva

        # Limpa linhas já utilizadas.
        f_result, b_result, partition = [], [], []
        # Conquistar
        left_ans = hirschberg(string_a[:n // 2], string_b[:cut], costs_matrix, gap_penalty, alphabet_to_ind)
        right_ans = hirschberg(string_a[n // 2:], string_b[cut:], costs_matrix, gap_penalty, alphabet_to_ind)

        #   União das soluções
        #   [string_x_editada, strin_y_editada, custo]
        print('After conquering: ', left_ans, right_ans, '\n------------------------')
        return [left_ans[r] + right_ans[r] for r in range(3)]


if __name__ == '__main__':
    # Read alphabet and scores from text file
    with open("scores.txt", 'r') as f:
        alphabet = f.readline()
        while (alphabet[-1] in ['\n', '\r']):
            alphabet = alphabet[:-1]
        f.readline()
        gapPenalty = int(f.readline())
        f.readline()
        simMatrix = []
        line = f.readline()
        while (line):
            row = list(int(x) for x in line.split())
            simMatrix.append(row)
            line = f.readline()

        # Create a 1-1 mapping from characters to integers, for simplicity in algorithm
        alphEnum = dict([(alphabet[i], i) for i in range(len(alphabet))])

        # Load input sequences
        with open("sequences.txt", 'r') as h, open("alignments.txt", 'w') as g:
            line = h.readline()

            while (line):
                # This loop repeats until no more input sequences are found
                # At each iteration we read the next two sequences and run the algorithm on them
                A = line
                while (A[-1] in ['\n', '\r']):
                    A = A[:-1]
                B = h.readline()
                while (B[-1] in ['\n', '\r']):
                    B = B[:-1]
                h.readline()
                line = h.readline()

                # Run the Hirschberg algorithm

                print("First sequence:", A)
                print("Second sequence:", B)
                print("Calculating alignment distance by Hirschberg method...")

                z = hirschberg(A, B, simMatrix, gapPenalty, alphEnum)

                print("Alignment of A: ", z[0])
                print("Alignment of B: ", z[1])
                print("Similarity score: ", z[2], '\n')

                # Write outputs to text file
                g.write(str(z[2]) + "\n")
                g.write(z[0] + "\n")
                g.write(z[1] + "\n")
                g.write("\n")
