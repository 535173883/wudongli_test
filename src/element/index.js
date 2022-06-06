import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import {
  Button,
  Message,
  Scrollbar,
  Container,
  Header,
  Main,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  Col,
  MenuItemGroup,
  Input,
  Tree,
  Select,
  Form,
  FormItem,
  Checkbox,
  Dialog,
  Table,
  TableColumn,
  Option,
  OptionGroup,
  Icon,
  Tabs,
  TabPane,
  Card,
  Pagination,
} from "element-ui";
const element = {
  install: function (Vue) {
    Vue.use(Button);
    Vue.use(Scrollbar);
    Vue.use(Container);
    Vue.use(Header);
    Vue.use(Main);
    Vue.use(Footer);
    Vue.use(Menu);
    Vue.use(MenuItem);
    Vue.use(Submenu);
    Vue.use(Col);
    Vue.use(MenuItemGroup);
    Vue.use(Input);
    Vue.use(Tree);
    Vue.use(Select);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Checkbox);
    Vue.use(Dialog);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Option);
    Vue.use(OptionGroup);
    Vue.use(Icon);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Card);
    Vue.use(Pagination);
  },
};
Vue.prototype.$message = Message;
export default element;
