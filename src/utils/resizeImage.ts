import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export async function resizeImage(uri: string) {
let manipulatorResult;
let size;

do {
    manipulatorResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], // Redimensionar a imagem para ter uma largura de 800
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG } // Comprimir a imagem para 80% e salvar como JPEG
    );

    // Obter o tamanho do arquivo da imagem redimensionada
    const fileInfo = await FileSystem.getInfoAsync(manipulatorResult.uri);
    if (fileInfo.exists) {
        size = fileInfo.size;
    } else {
        size = 0;
    }
} while (size > 2 * 1024 * 1024); // Continuar redimensionando enquanto a imagem for maior que 2MB

  return manipulatorResult.uri; // Retornar a URI da imagem redimensionada
}