# mjml-app
:email: The desktop app for MJML

### Road to 2.0.0

#### Redesign :joy:

- [x] fresh interface, new buttons, modals, alerts, lists, dropdowns, etc.
- [x] new editor: ability to resize panels with Drag&Drop handlers
- [x] use codemirror instead of Brace
- [ ] use linter? see how.
- [ ] prevent losing preview by clicking on email links ([#73](https://github.com/mjmlio/mjml-app/issues/73))
- [ ] button to clear images cache ([#72](https://github.com/mjmlio/mjml-app/issues/72))
- [ ] put back MJML desktop icons instead of Electron icons from boilerplate

#### Internal refactoring

- [x] use file system based behaviour, store only work folders in config (this will allow using `mj-include` [#65](https://github.com/mjmlio/mjml-app/issues/65), and so will use system folders [#53](https://github.com/mjmlio/mjml-app/issues/53))
- [x] integrate MJML, expose mjml2html service

#### Templates

- [ ] See if possible to sync templates from [mjml.io](https://mjml.io)
