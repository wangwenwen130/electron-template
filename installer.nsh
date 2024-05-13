!macro preInit
    SetRegView 64
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\WXZ\TerminalNational"
    WriteRegExpandStr HkCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\WXZ\TerminalNational"
    SetRegView 32
    WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\WXZ\TerminalNational"
    WriteRegExpandStr HkCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\WXZ\TerminalNational"
!macroend