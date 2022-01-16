export default ({ from, route, redirect }) => {
  // URLに直アクセスした場合、step1にリダイレクト
  if (
    route.name === 'step1' ||
    (from?.name === 'step1' && route.name === 'step2') ||
    (from?.name === 'step2' && route.name === 'step1') ||
    (from?.name === 'step2' && route.name === 'step3') ||
    (from?.name === 'step3' && route.name === 'step2')
  ) return;
  redirect('/step1');
}
