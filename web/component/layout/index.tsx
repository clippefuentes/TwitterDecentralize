import Header from './header';

const Layout = (props: any) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  )
}

export default Layout;