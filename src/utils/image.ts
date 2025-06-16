export function base64ToFile(base64String: string, filename: string): File {
    const [header, base64] = base64String.split(',');

    const mimeType = header.match(/:(.*?);/);
    if (!mimeType) {
        throw new Error('Tipo MIME não encontrado na string base64');
    }

    const mime = mimeType[1];

    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: mime });

    return new File([blob], filename, { type: mime });
}
