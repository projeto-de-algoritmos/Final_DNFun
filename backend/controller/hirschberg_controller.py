from hirschberg.algo import *

def hirschberg_controller(str_x, str_y, alphabet: dict, gap_cost):
    alphabet_to_ind = {str(char_i): val for val, char_i in enumerate(alphabet.keys())}
    costs_matrix = [[0] * len(alphabet.keys()) for a in alphabet.keys()]

    for key_parent, val_dict in alphabet.items():
        for key, val in val_dict.items():
            costs_matrix[alphabet_to_ind[str(key_parent)]][alphabet_to_ind[str(key)]] = val
            costs_matrix[alphabet_to_ind[str(key)]][alphabet_to_ind[str(key_parent)]] = val

    print('Costs matrix: \n', costs_matrix)
    print('Alphabet mapping: ', alphabet_to_ind)
    result = hirschberg (str_x, str_y, costs_matrix, gap_cost, alphabet_to_ind)

    return {
        'ans': [r for r in result]
    }

if __name__ == '__main__':
    hirschberg_controller('', '', {'a': {'b': 5, 'c': 7}, 'b':{'c':6}, 'c':{}}, -3)