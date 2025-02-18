import { isWindowAvailable } from './isWindowAvailable';

function fallbackCopyTextToClipboard(text: string) {
  let success = false;

  if (!document || !document.body) {
    console.error('Document or document.body is not available');
    return success;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  textArea.style.top = '0';
  document.body.appendChild(textArea);

  try {
    textArea.focus();
    textArea.setSelectionRange(0, textArea.value.length);
    success = document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  } finally {
    document.body.removeChild(textArea);
  }

  return success;
}
export async function copyToClipboard(text: string) {
  if (!isWindowAvailable()) {
    return false;
  }

  let success = false;

  if (!navigator.clipboard) {
    success = fallbackCopyTextToClipboard(text);
  } else {
    success = await navigator.clipboard.writeText(text).then(
      function done() {
        return true;
      },
      function error(err) {
        console.error('Async: Could not copy text: ', err);
        return false;
      },
    );
  }

  return success;
}
