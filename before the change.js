function refreshIframesOnLoad() {
  const refreshableIframes = document.querySelectorAll('[data-refresh-on-load="true"]');
  if (!refreshableIframes.length) return;

  const cacheBust = Date.now().toString();

  refreshableIframes.forEach((iframe) => {
    const src = iframe.getAttribute("src");
    if (!src) return;

    try {
      const url = new URL(src, window.location.href);
      url.searchParams.set("_cb", cacheBust);
      iframe.src = url.toString();
    } catch {
      const separator = src.includes("?") ? "&" : "?";
      iframe.src = `${src}${separator}_cb=${cacheBust}`;
    }
  });
}