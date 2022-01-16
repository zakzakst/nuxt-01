export default {
  layout: 'step2',
  transition (to, from) {
    if (
      (from?.name === 'step2' && to?.name === 'step1') ||
      (from?.name === 'step3' && to?.name === 'step2')
    ) {
      return 'slide-right';
    } else {
      return 'slide-left';
    }
  },
}
