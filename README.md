# mjml-app
:email: The desktop app for MJML

### Road to 2.0.0

#### Redesign :joy:

- [ ] fresh interface, new buttons, modals, alerts, lists, dropdowns, etc.
- [ ] new editor: ability to resize panels with Drag&Drop handlers
- [ ] use codemirror instead of Brace
- [ ] use linter? see how.
- [ ] prevent losing preview by clicking on email links ([#73](https://github.com/mjmlio/mjml-app/issues/73))
- [ ] button to clear images cache ([#72](https://github.com/mjmlio/mjml-app/issues/72))

#### Internal refactoring

- [ ] use file system based behaviour, store only work folders in config (this will allow using `mj-include` [#65](https://github.com/mjmlio/mjml-app/issues/65), and so will use system folders [#53](https://github.com/mjmlio/mjml-app/issues/53))
- [ ] integrate MJML, expose mjml2html service

#### Templates

- [ ] See if possible to sync templates from [mjml.io](https://mjml.io)
