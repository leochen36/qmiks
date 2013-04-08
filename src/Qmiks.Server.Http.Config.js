/**
 * @author:leochen
 * @email:cwq0312@163.com
 * @version:0.91.008
 * 
 * http服务 配置
 */
// server
(function(Q) {
	// 加载模块
	var Http = require("./Qmiks.Server.Http");
	Http.Config = {
		// 会话session配置,session config
		session : {
			// session超时时间,单位分钟;
			timeout : 30
		},
		// cookie保存时间
		cookie : {
			// cookie保存时间,单位分钟
			timeout : 7 * 24 * 60
		},
		// 需要缓存的文件类型
		cache : {
			"js" : "",
			"css" : "",
			"html" : "",
			"htm" : "",
			"" : ""
		},
		// 静态文件类型
		mimeMapping : {
			'123' : {
				mimeType : 'application/vnd.lotus-1-2-3'
			},
			'3dml' : {
				mimeType : 'text/vnd.in3d.3dml'
			},
			'3ds' : {
				mimeType : 'image/x-3ds'
			},
			'3g2' : {
				mimeType : 'video/3gpp2'
			},
			'3gp' : {
				mimeType : 'video/3gpp'
			},
			'7z' : {
				mimeType : 'application/x-7z-compressed'
			},
			'aab' : {
				mimeType : 'application/x-authorware-bin'
			},
			'aac' : {
				mimeType : 'audio/x-aac'
			},
			'aam' : {
				mimeType : 'application/x-authorware-map'
			},
			'aas' : {
				mimeType : 'application/x-authorware-seg'
			},
			'abs' : {
				mimeType : 'audio/x-mpeg'
			},
			'abw' : {
				mimeType : 'application/x-abiword'
			},
			'ac' : {
				mimeType : 'application/pkix-attr-cert'
			},
			'acc' : {
				mimeType : 'application/vnd.americandynamics.acc'
			},
			'ace' : {
				mimeType : 'application/x-ace-compressed'
			},
			'acu' : {
				mimeType : 'application/vnd.acucobol'
			},
			'acutc' : {
				mimeType : 'application/vnd.acucorp'
			},
			'adp' : {
				mimeType : 'audio/adpcm'
			},
			'aep' : {
				mimeType : 'application/vnd.audiograph'
			},
			'afm' : {
				mimeType : 'application/x-font-type1'
			},
			'afp' : {
				mimeType : 'application/vnd.ibm.modcap'
			},
			'ahead' : {
				mimeType : 'application/vnd.ahead.space'
			},
			'ai' : {
				mimeType : 'application/postscript'
			},
			'aif' : {
				mimeType : 'audio/x-aiff'
			},
			'aifc' : {
				mimeType : 'audio/x-aiff'
			},
			'aiff' : {
				mimeType : 'audio/x-aiff'
			},
			'aim' : {
				mimeType : 'application/x-aim'
			},
			'air' : {
				mimeType : 'application/vnd.adobe.air-application-installer-package+zip'
			},
			'ait' : {
				mimeType : 'application/vnd.dvb.ait'
			},
			'ami' : {
				mimeType : 'application/vnd.amiga.ami'
			},
			'anx' : {
				mimeType : 'application/annodex'
			},
			'apk' : {
				mimeType : 'application/vnd.android.package-archive'
			},
			'appcache' : {
				mimeType : 'text/cache-manifest'
			},
			'application' : {
				mimeType : 'application/x-ms-application'
			},
			'apr' : {
				mimeType : 'application/vnd.lotus-approach'
			},
			'arc' : {
				mimeType : 'application/x-freearc'
			},
			'art' : {
				mimeType : 'image/x-jg'
			},
			'asc' : {
				mimeType : 'application/pgp-signature'
			},
			'asf' : {
				mimeType : 'video/x-ms-asf'
			},
			'asm' : {
				mimeType : 'text/x-asm'
			},
			'aso' : {
				mimeType : 'application/vnd.accpac.simply.aso'
			},
			'asx' : {
				mimeType : 'video/x-ms-asf'
			},
			'atc' : {
				mimeType : 'application/vnd.acucorp'
			},
			'atom' : {
				mimeType : 'application/atom+xml'
			},
			'atomcat' : {
				mimeType : 'application/atomcat+xml'
			},
			'atomsvc' : {
				mimeType : 'application/atomsvc+xml'
			},
			'atx' : {
				mimeType : 'application/vnd.antix.game-component'
			},
			'au' : {
				mimeType : 'audio/basic'
			},
			'avi' : {
				mimeType : 'video/x-msvideo'
			},
			'avx' : {
				mimeType : 'video/x-rad-screenplay'
			},
			'aw' : {
				mimeType : 'application/applixware'
			},
			'axa' : {
				mimeType : 'audio/annodex'
			},
			'axv' : {
				mimeType : 'video/annodex'
			},
			'azf' : {
				mimeType : 'application/vnd.airzip.filesecure.azf'
			},
			'azs' : {
				mimeType : 'application/vnd.airzip.filesecure.azs'
			},
			'azw' : {
				mimeType : 'application/vnd.amazon.ebook'
			},
			'bat' : {
				mimeType : 'application/x-msdownload'
			},
			'bcpio' : {
				mimeType : 'application/x-bcpio'
			},
			'bdf' : {
				mimeType : 'application/x-font-bdf'
			},
			'bdm' : {
				mimeType : 'application/vnd.syncml.dm+wbxml'
			},
			'bed' : {
				mimeType : 'application/vnd.realvnc.bed'
			},
			'bh2' : {
				mimeType : 'application/vnd.fujitsu.oasysprs'
			},
			'bin' : {
				mimeType : 'application/octet-stream'
			},
			'blb' : {
				mimeType : 'application/x-blorb'
			},
			'blorb' : {
				mimeType : 'application/x-blorb'
			},
			'bmi' : {
				mimeType : 'application/vnd.bmi'
			},
			'bmp' : {
				mimeType : 'image/bmp'
			},
			'body' : {
				mimeType : 'text/html'
			},
			'book' : {
				mimeType : 'application/vnd.framemaker'
			},
			'box' : {
				mimeType : 'application/vnd.previewsystems.box'
			},
			'boz' : {
				mimeType : 'application/x-bzip2'
			},
			'bpk' : {
				mimeType : 'application/octet-stream'
			},
			'btif' : {
				mimeType : 'image/prs.btif'
			},
			'bz' : {
				mimeType : 'application/x-bzip'
			},
			'bz2' : {
				mimeType : 'application/x-bzip2'
			},
			'c' : {
				mimeType : 'text/x-c'
			},
			'c11amc' : {
				mimeType : 'application/vnd.cluetrust.cartomobile-config'
			},
			'c11amz' : {
				mimeType : 'application/vnd.cluetrust.cartomobile-config-pkg'
			},
			'c4d' : {
				mimeType : 'application/vnd.clonk.c4group'
			},
			'c4f' : {
				mimeType : 'application/vnd.clonk.c4group'
			},
			'c4g' : {
				mimeType : 'application/vnd.clonk.c4group'
			},
			'c4p' : {
				mimeType : 'application/vnd.clonk.c4group'
			},
			'c4u' : {
				mimeType : 'application/vnd.clonk.c4group'
			},
			'cab' : {
				mimeType : 'application/vnd.ms-cab-compressed'
			},
			'caf' : {
				mimeType : 'audio/x-caf'
			},
			'cap' : {
				mimeType : 'application/vnd.tcpdump.pcap'
			},
			'car' : {
				mimeType : 'application/vnd.curl.car'
			},
			'cat' : {
				mimeType : 'application/vnd.ms-pki.seccat'
			},
			'cb7' : {
				mimeType : 'application/x-cbr'
			},
			'cba' : {
				mimeType : 'application/x-cbr'
			},
			'cbr' : {
				mimeType : 'application/x-cbr'
			},
			'cbt' : {
				mimeType : 'application/x-cbr'
			},
			'cbz' : {
				mimeType : 'application/x-cbr'
			},
			'cc' : {
				mimeType : 'text/x-c'
			},
			'cct' : {
				mimeType : 'application/x-director'
			},
			'ccxml' : {
				mimeType : 'application/ccxml+xml'
			},
			'cdbcmsg' : {
				mimeType : 'application/vnd.contact.cmsg'
			},
			'cdf' : {
				mimeType : 'application/x-cdf'
			},
			'cdkey' : {
				mimeType : 'application/vnd.mediastation.cdkey'
			},
			'cdmia' : {
				mimeType : 'application/cdmi-capability'
			},
			'cdmic' : {
				mimeType : 'application/cdmi-container'
			},
			'cdmid' : {
				mimeType : 'application/cdmi-domain'
			},
			'cdmio' : {
				mimeType : 'application/cdmi-object'
			},
			'cdmiq' : {
				mimeType : 'application/cdmi-queue'
			},
			'cdx' : {
				mimeType : 'chemical/x-cdx'
			},
			'cdxml' : {
				mimeType : 'application/vnd.chemdraw+xml'
			},
			'cdy' : {
				mimeType : 'application/vnd.cinderella'
			},
			'cer' : {
				mimeType : 'application/pkix-cert'
			},
			'cfs' : {
				mimeType : 'application/x-cfs-compressed'
			},
			'cgm' : {
				mimeType : 'image/cgm'
			},
			'chat' : {
				mimeType : 'application/x-chat'
			},
			'chm' : {
				mimeType : 'application/vnd.ms-htmlhelp'
			},
			'chrt' : {
				mimeType : 'application/vnd.kde.kchart'
			},
			'cif' : {
				mimeType : 'chemical/x-cif'
			},
			'cii' : {
				mimeType : 'application/vnd.anser-web-certificate-issue-initiation'
			},
			'cil' : {
				mimeType : 'application/vnd.ms-artgalry'
			},
			'cla' : {
				mimeType : 'application/vnd.claymore'
			},
			'class' : {
				mimeType : 'application/java'
			},
			'clkk' : {
				mimeType : 'application/vnd.crick.clicker.keyboard'
			},
			'clkp' : {
				mimeType : 'application/vnd.crick.clicker.palette'
			},
			'clkt' : {
				mimeType : 'application/vnd.crick.clicker.template'
			},
			'clkw' : {
				mimeType : 'application/vnd.crick.clicker.wordbank'
			},
			'clkx' : {
				mimeType : 'application/vnd.crick.clicker'
			},
			'clp' : {
				mimeType : 'application/x-msclip'
			},
			'cmc' : {
				mimeType : 'application/vnd.cosmocaller'
			},
			'cmdf' : {
				mimeType : 'chemical/x-cmdf'
			},
			'cml' : {
				mimeType : 'chemical/x-cml'
			},
			'cmp' : {
				mimeType : 'application/vnd.yellowriver-custom-menu'
			},
			'cmx' : {
				mimeType : 'image/x-cmx'
			},
			'cod' : {
				mimeType : 'application/vnd.rim.cod'
			},
			'com' : {
				mimeType : 'application/x-msdownload'
			},
			'conf' : {
				mimeType : 'text/plain'
			},
			'cpio' : {
				mimeType : 'application/x-cpio'
			},
			'cpp' : {
				mimeType : 'text/x-c'
			},
			'cpt' : {
				mimeType : 'application/mac-compactpro'
			},
			'crd' : {
				mimeType : 'application/x-mscardfile'
			},
			'crl' : {
				mimeType : 'application/pkix-crl'
			},
			'crt' : {
				mimeType : 'application/x-x509-ca-cert'
			},
			'cryptonote' : {
				mimeType : 'application/vnd.rig.cryptonote'
			},
			'csh' : {
				mimeType : 'application/x-csh'
			},
			'csml' : {
				mimeType : 'chemical/x-csml'
			},
			'csp' : {
				mimeType : 'application/vnd.commonspace'
			},
			'css' : {
				mimeType : 'text/css'
			},
			'cst' : {
				mimeType : 'application/x-director'
			},
			'csv' : {
				mimeType : 'text/csv'
			},
			'cu' : {
				mimeType : 'application/cu-seeme'
			},
			'curl' : {
				mimeType : 'text/vnd.curl'
			},
			'cww' : {
				mimeType : 'application/prs.cww'
			},
			'cxt' : {
				mimeType : 'application/x-director'
			},
			'cxx' : {
				mimeType : 'text/x-c'
			},
			'dae' : {
				mimeType : 'model/vnd.collada+xml'
			},
			'daf' : {
				mimeType : 'application/vnd.mobius.daf'
			},
			'dart' : {
				mimeType : 'application/vnd.dart'
			},
			'dataless' : {
				mimeType : 'application/vnd.fdsn.seed'
			},
			'davmount' : {
				mimeType : 'application/davmount+xml'
			},
			'dbk' : {
				mimeType : 'application/docbook+xml'
			},
			'dcr' : {
				mimeType : 'application/x-director'
			},
			'dcurl' : {
				mimeType : 'text/vnd.curl.dcurl'
			},
			'dd2' : {
				mimeType : 'application/vnd.oma.dd2+xml'
			},
			'ddd' : {
				mimeType : 'application/vnd.fujixerox.ddd'
			},
			'deb' : {
				mimeType : 'application/x-debian-package'
			},
			'def' : {
				mimeType : 'text/plain'
			},
			'deploy' : {
				mimeType : 'application/octet-stream'
			},
			'der' : {
				mimeType : 'application/x-x509-ca-cert'
			},
			'dfac' : {
				mimeType : 'application/vnd.dreamfactory'
			},
			'dgc' : {
				mimeType : 'application/x-dgc-compressed'
			},
			'dib' : {
				mimeType : 'image/bmp'
			},
			'dic' : {
				mimeType : 'text/x-c'
			},
			'dir' : {
				mimeType : 'application/x-director'
			},
			'dis' : {
				mimeType : 'application/vnd.mobius.dis'
			},
			'dist' : {
				mimeType : 'application/octet-stream'
			},
			'distz' : {
				mimeType : 'application/octet-stream'
			},
			'djv' : {
				mimeType : 'image/vnd.djvu'
			},
			'djvu' : {
				mimeType : 'image/vnd.djvu'
			},
			'dll' : {
				mimeType : 'application/x-msdownload'
			},
			'dmg' : {
				mimeType : 'application/x-apple-diskimage'
			},
			'dmp' : {
				mimeType : 'application/vnd.tcpdump.pcap'
			},
			'dms' : {
				mimeType : 'application/octet-stream'
			},
			'dna' : {
				mimeType : 'application/vnd.dna'
			},
			'doc' : {
				mimeType : 'application/msword'
			},
			'docm' : {
				mimeType : 'application/vnd.ms-word.document.macroenabled.12'
			},
			'docx' : {
				mimeType : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			},
			'dot' : {
				mimeType : 'application/msword'
			},
			'dotm' : {
				mimeType : 'application/vnd.ms-word.template.macroenabled.12'
			},
			'dotx' : {
				mimeType : 'application/vnd.openxmlformats-officedocument.wordprocessingml.template'
			},
			'dp' : {
				mimeType : 'application/vnd.osgi.dp'
			},
			'dpg' : {
				mimeType : 'application/vnd.dpgraph'
			},
			'dra' : {
				mimeType : 'audio/vnd.dra'
			},
			'dsc' : {
				mimeType : 'text/prs.lines.tag'
			},
			'dssc' : {
				mimeType : 'application/dssc+der'
			},
			'dtb' : {
				mimeType : 'application/x-dtbook+xml'
			},
			'dtd' : {
				mimeType : 'application/xml-dtd'
			},
			'dts' : {
				mimeType : 'audio/vnd.dts'
			},
			'dtshd' : {
				mimeType : 'audio/vnd.dts.hd'
			},
			'dump' : {
				mimeType : 'application/octet-stream'
			},
			'dv' : {
				mimeType : 'video/x-dv'
			},
			'dvb' : {
				mimeType : 'video/vnd.dvb.file'
			},
			'dvi' : {
				mimeType : 'application/x-dvi'
			},
			'dwf' : {
				mimeType : 'model/vnd.dwf'
			},
			'dwg' : {
				mimeType : 'image/vnd.dwg'
			},
			'dxf' : {
				mimeType : 'image/vnd.dxf'
			},
			'dxp' : {
				mimeType : 'application/vnd.spotfire.dxp'
			},
			'dxr' : {
				mimeType : 'application/x-director'
			},
			'ecelp4800' : {
				mimeType : 'audio/vnd.nuera.ecelp4800'
			},
			'ecelp7470' : {
				mimeType : 'audio/vnd.nuera.ecelp7470'
			},
			'ecelp9600' : {
				mimeType : 'audio/vnd.nuera.ecelp9600'
			},
			'ecma' : {
				mimeType : 'application/ecmascript'
			},
			'edm' : {
				mimeType : 'application/vnd.novadigm.edm'
			},
			'edx' : {
				mimeType : 'application/vnd.novadigm.edx'
			},
			'efif' : {
				mimeType : 'application/vnd.picsel'
			},
			'ei6' : {
				mimeType : 'application/vnd.pg.osasli'
			},
			'elc' : {
				mimeType : 'application/octet-stream'
			},
			'emf' : {
				mimeType : 'application/x-msmetafile'
			},
			'eml' : {
				mimeType : 'message/rfc822'
			},
			'emma' : {
				mimeType : 'application/emma+xml'
			},
			'emz' : {
				mimeType : 'application/x-msmetafile'
			},
			'eol' : {
				mimeType : 'audio/vnd.digital-winds'
			},
			'eot' : {
				mimeType : 'application/vnd.ms-fontobject'
			},
			'eps' : {
				mimeType : 'application/postscript'
			},
			'epub' : {
				mimeType : 'application/epub+zip'
			},
			'es3' : {
				mimeType : 'application/vnd.eszigno3+xml'
			},
			'esa' : {
				mimeType : 'application/vnd.osgi.subsystem'
			},
			'esf' : {
				mimeType : 'application/vnd.epson.esf'
			},
			'et3' : {
				mimeType : 'application/vnd.eszigno3+xml'
			},
			'etx' : {
				mimeType : 'text/x-setext'
			},
			'eva' : {
				mimeType : 'application/x-eva'
			},
			'evy' : {
				mimeType : 'application/x-envoy'
			},
			'exe' : {
				mimeType : 'application/octet-stream'
			},
			'exi' : {
				mimeType : 'application/exi'
			},
			'ext' : {
				mimeType : 'application/vnd.novadigm.ext'
			},
			'ez' : {
				mimeType : 'application/andrew-inset'
			},
			'ez2' : {
				mimeType : 'application/vnd.ezpix-album'
			},
			'ez3' : {
				mimeType : 'application/vnd.ezpix-package'
			},
			'f' : {
				mimeType : 'text/x-fortran'
			},
			'f4v' : {
				mimeType : 'video/x-f4v'
			},
			'f77' : {
				mimeType : 'text/x-fortran'
			},
			'f90' : {
				mimeType : 'text/x-fortran'
			},
			'fbs' : {
				mimeType : 'image/vnd.fastbidsheet'
			},
			'fcdt' : {
				mimeType : 'application/vnd.adobe.formscentral.fcdt'
			},
			'fcs' : {
				mimeType : 'application/vnd.isac.fcs'
			},
			'fdf' : {
				mimeType : 'application/vnd.fdf'
			},
			'fe_launch' : {
				mimeType : 'application/vnd.denovo.fcselayout-link'
			},
			'fg5' : {
				mimeType : 'application/vnd.fujitsu.oasysgp'
			},
			'fgd' : {
				mimeType : 'application/x-director'
			},
			'fh' : {
				mimeType : 'image/x-freehand'
			},
			'fh4' : {
				mimeType : 'image/x-freehand'
			},
			'fh5' : {
				mimeType : 'image/x-freehand'
			},
			'fh7' : {
				mimeType : 'image/x-freehand'
			},
			'fhc' : {
				mimeType : 'image/x-freehand'
			},
			'fig' : {
				mimeType : 'application/x-xfig'
			},
			'flac' : {
				mimeType : 'audio/flac'
			},
			'fli' : {
				mimeType : 'video/x-fli'
			},
			'flo' : {
				mimeType : 'application/vnd.micrografx.flo'
			},
			'flv' : {
				mimeType : 'video/x-flv'
			},
			'flw' : {
				mimeType : 'application/vnd.kde.kivio'
			},
			'flx' : {
				mimeType : 'text/vnd.fmi.flexstor'
			},
			'fly' : {
				mimeType : 'text/vnd.fly'
			},
			'fm' : {
				mimeType : 'application/vnd.framemaker'
			},
			'fnc' : {
				mimeType : 'application/vnd.frogans.fnc'
			},
			'for' : {
				mimeType : 'text/x-fortran'
			},
			'fpx' : {
				mimeType : 'image/vnd.fpx'
			},
			'frame' : {
				mimeType : 'application/vnd.framemaker'
			},
			'fsc' : {
				mimeType : 'application/vnd.fsc.weblaunch'
			},
			'fst' : {
				mimeType : 'image/vnd.fst'
			},
			'ftc' : {
				mimeType : 'application/vnd.fluxtime.clip'
			},
			'fti' : {
				mimeType : 'application/vnd.anser-web-funds-transfer-initiation'
			},
			'fvt' : {
				mimeType : 'video/vnd.fvt'
			},
			'fxp' : {
				mimeType : 'application/vnd.adobe.fxp'
			},
			'fxpl' : {
				mimeType : 'application/vnd.adobe.fxp'
			},
			'fzs' : {
				mimeType : 'application/vnd.fuzzysheet'
			},
			'g2w' : {
				mimeType : 'application/vnd.geoplan'
			},
			'g3' : {
				mimeType : 'image/g3fax'
			},
			'g3w' : {
				mimeType : 'application/vnd.geospace'
			},
			'gac' : {
				mimeType : 'application/vnd.groove-account'
			},
			'gam' : {
				mimeType : 'application/x-tads'
			},
			'gbr' : {
				mimeType : 'application/rpki-ghostbusters'
			},
			'gca' : {
				mimeType : 'application/x-gca-compressed'
			},
			'gdl' : {
				mimeType : 'model/vnd.gdl'
			},
			'geo' : {
				mimeType : 'application/vnd.dynageo'
			},
			'gex' : {
				mimeType : 'application/vnd.geometry-explorer'
			},
			'ggb' : {
				mimeType : 'application/vnd.geogebra.file'
			},
			'ggt' : {
				mimeType : 'application/vnd.geogebra.tool'
			},
			'ghf' : {
				mimeType : 'application/vnd.groove-help'
			},
			'gif' : {
				mimeType : 'image/gif'
			},
			'gim' : {
				mimeType : 'application/vnd.groove-identity-message'
			},
			'gml' : {
				mimeType : 'application/gml+xml'
			},
			'gmx' : {
				mimeType : 'application/vnd.gmx'
			},
			'gnumeric' : {
				mimeType : 'application/x-gnumeric'
			},
			'gph' : {
				mimeType : 'application/vnd.flographit'
			},
			'gpx' : {
				mimeType : 'application/gpx+xml'
			},
			'gqf' : {
				mimeType : 'application/vnd.grafeq'
			},
			'gqs' : {
				mimeType : 'application/vnd.grafeq'
			},
			'gram' : {
				mimeType : 'application/srgs'
			},
			'gramps' : {
				mimeType : 'application/x-gramps-xml'
			},
			'gre' : {
				mimeType : 'application/vnd.geometry-explorer'
			},
			'grv' : {
				mimeType : 'application/vnd.groove-injector'
			},
			'grxml' : {
				mimeType : 'application/srgs+xml'
			},
			'gsf' : {
				mimeType : 'application/x-font-ghostscript'
			},
			'gtar' : {
				mimeType : 'application/x-gtar'
			},
			'gtm' : {
				mimeType : 'application/vnd.groove-tool-message'
			},
			'gtw' : {
				mimeType : 'model/vnd.gtw'
			},
			'gv' : {
				mimeType : 'text/vnd.graphviz'
			},
			'gxf' : {
				mimeType : 'application/gxf'
			},
			'gxt' : {
				mimeType : 'application/vnd.geonext'
			},
			'gz' : {
				mimeType : 'application/x-gzip'
			},
			'h' : {
				mimeType : 'text/x-c'
			},
			'h261' : {
				mimeType : 'video/h261'
			},
			'h263' : {
				mimeType : 'video/h263'
			},
			'h264' : {
				mimeType : 'video/h264'
			},
			'hal' : {
				mimeType : 'application/vnd.hal+xml'
			},
			'hbci' : {
				mimeType : 'application/vnd.hbci'
			},
			'hdf' : {
				mimeType : 'application/x-hdf'
			},
			'hh' : {
				mimeType : 'text/x-c'
			},
			'hlp' : {
				mimeType : 'application/winhlp'
			},
			'hpgl' : {
				mimeType : 'application/vnd.hp-hpgl'
			},
			'hpid' : {
				mimeType : 'application/vnd.hp-hpid'
			},
			'hps' : {
				mimeType : 'application/vnd.hp-hps'
			},
			'hqx' : {
				mimeType : 'application/mac-binhex40'
			},
			'htc' : {
				mimeType : 'text/x-component'
			},
			'htke' : {
				mimeType : 'application/vnd.kenameaapp'
			},
			'htm' : {
				mimeType : 'text/html'
			},
			'html' : {
				mimeType : 'text/html'
			},
			'hvd' : {
				mimeType : 'application/vnd.yamaha.hv-dic'
			},
			'hvp' : {
				mimeType : 'application/vnd.yamaha.hv-voice'
			},
			'hvs' : {
				mimeType : 'application/vnd.yamaha.hv-script'
			},
			'i2g' : {
				mimeType : 'application/vnd.intergeo'
			},
			'icc' : {
				mimeType : 'application/vnd.iccprofile'
			},
			'ice' : {
				mimeType : 'x-conference/x-cooltalk'
			},
			'icm' : {
				mimeType : 'application/vnd.iccprofile'
			},
			'ico' : {
				mimeType : 'image/x-icon'
			},
			'ics' : {
				mimeType : 'text/calendar'
			},
			'ief' : {
				mimeType : 'image/ief'
			},
			'ifb' : {
				mimeType : 'text/calendar'
			},
			'ifm' : {
				mimeType : 'application/vnd.shana.informed.formdata'
			},
			'iges' : {
				mimeType : 'model/iges'
			},
			'igl' : {
				mimeType : 'application/vnd.igloader'
			},
			'igm' : {
				mimeType : 'application/vnd.insors.igm'
			},
			'igs' : {
				mimeType : 'model/iges'
			},
			'igx' : {
				mimeType : 'application/vnd.micrografx.igx'
			},
			'iif' : {
				mimeType : 'application/vnd.shana.informed.interchange'
			},
			'imp' : {
				mimeType : 'application/vnd.accpac.simply.imp'
			},
			'ims' : {
				mimeType : 'application/vnd.ms-ims'
			},
			'in' : {
				mimeType : 'text/plain'
			},
			'ink' : {
				mimeType : 'application/inkml+xml'
			},
			'inkml' : {
				mimeType : 'application/inkml+xml'
			},
			'install' : {
				mimeType : 'application/x-install-instructions'
			},
			'iota' : {
				mimeType : 'application/vnd.astraea-software.iota'
			},
			'ipfix' : {
				mimeType : 'application/ipfix'
			},
			'ipk' : {
				mimeType : 'application/vnd.shana.informed.package'
			},
			'irm' : {
				mimeType : 'application/vnd.ibm.rights-management'
			},
			'irp' : {
				mimeType : 'application/vnd.irepository.package+xml'
			},
			'iso' : {
				mimeType : 'application/x-iso9660-image'
			},
			'itp' : {
				mimeType : 'application/vnd.shana.informed.formtemplate'
			},
			'ivp' : {
				mimeType : 'application/vnd.immervision-ivp'
			},
			'ivu' : {
				mimeType : 'application/vnd.immervision-ivu'
			},
			'jad' : {
				mimeType : 'text/vnd.sun.j2me.app-descriptor'
			},
			'jam' : {
				mimeType : 'application/vnd.jam'
			},
			'jar' : {
				mimeType : 'application/java-archive'
			},
			'java' : {
				mimeType : 'text/x-java-source'
			},
			'jisp' : {
				mimeType : 'application/vnd.jisp'
			},
			'jlt' : {
				mimeType : 'application/vnd.hp-jlyt'
			},
			'jnlp' : {
				mimeType : 'application/x-java-jnlp-file'
			},
			'joda' : {
				mimeType : 'application/vnd.joost.joda-archive'
			},
			'jpe' : {
				mimeType : 'image/jpeg'
			},
			'jpeg' : {
				mimeType : 'image/jpeg'
			},
			'jpg' : {
				mimeType : 'image/jpeg'
			},
			'jpgm' : {
				mimeType : 'video/jpm'
			},
			'jpgv' : {
				mimeType : 'video/jpeg'
			},
			'jpm' : {
				mimeType : 'video/jpm'
			},
			'js' : {
				mimeType : 'application/javascript'
			},
			'jsf' : {
				mimeType : 'text/plain'
			},
			'json' : {
				mimeType : 'application/json'
			},
			'jsonml' : {
				mimeType : 'application/jsonml+json'
			},
			'jspf' : {
				mimeType : 'text/plain'
			},
			'kar' : {
				mimeType : 'audio/midi'
			},
			'karbon' : {
				mimeType : 'application/vnd.kde.karbon'
			},
			'kfo' : {
				mimeType : 'application/vnd.kde.kformula'
			},
			'kia' : {
				mimeType : 'application/vnd.kidspiration'
			},
			'kml' : {
				mimeType : 'application/vnd.google-earth.kml+xml'
			},
			'kmz' : {
				mimeType : 'application/vnd.google-earth.kmz'
			},
			'kne' : {
				mimeType : 'application/vnd.kinar'
			},
			'knp' : {
				mimeType : 'application/vnd.kinar'
			},
			'kon' : {
				mimeType : 'application/vnd.kde.kontour'
			},
			'kpr' : {
				mimeType : 'application/vnd.kde.kpresenter'
			},
			'kpt' : {
				mimeType : 'application/vnd.kde.kpresenter'
			},
			'kpxx' : {
				mimeType : 'application/vnd.ds-keypoint'
			},
			'ksp' : {
				mimeType : 'application/vnd.kde.kspread'
			},
			'ktr' : {
				mimeType : 'application/vnd.kahootz'
			},
			'ktx' : {
				mimeType : 'image/ktx'
			},
			'ktz' : {
				mimeType : 'application/vnd.kahootz'
			},
			'kwd' : {
				mimeType : 'application/vnd.kde.kword'
			},
			'kwt' : {
				mimeType : 'application/vnd.kde.kword'
			},
			'lasxml' : {
				mimeType : 'application/vnd.las.las+xml'
			},
			'latex' : {
				mimeType : 'application/x-latex'
			},
			'lbd' : {
				mimeType : 'application/vnd.llamagraphics.life-balance.desktop'
			},
			'lbe' : {
				mimeType : 'application/vnd.llamagraphics.life-balance.exchange+xml'
			},
			'les' : {
				mimeType : 'application/vnd.hhe.lesson-player'
			},
			'lha' : {
				mimeType : 'application/x-lzh-compressed'
			},
			'link66' : {
				mimeType : 'application/vnd.route66.link66+xml'
			},
			'list' : {
				mimeType : 'text/plain'
			},
			'list3820' : {
				mimeType : 'application/vnd.ibm.modcap'
			},
			'listafp' : {
				mimeType : 'application/vnd.ibm.modcap'
			},
			'lnk' : {
				mimeType : 'application/x-ms-shortcut'
			},
			'log' : {
				mimeType : 'text/plain'
			},
			'lostxml' : {
				mimeType : 'application/lost+xml'
			},
			'lrf' : {
				mimeType : 'application/octet-stream'
			},
			'lrm' : {
				mimeType : 'application/vnd.ms-lrm'
			},
			'ltf' : {
				mimeType : 'application/vnd.frogans.ltf'
			},
			'lvp' : {
				mimeType : 'audio/vnd.lucent.voice'
			},
			'lwp' : {
				mimeType : 'application/vnd.lotus-wordpro'
			},
			'lzh' : {
				mimeType : 'application/x-lzh-compressed'
			},
			'm13' : {
				mimeType : 'application/x-msmediaview'
			},
			'm14' : {
				mimeType : 'application/x-msmediaview'
			},
			'm1v' : {
				mimeType : 'video/mpeg'
			},
			'm21' : {
				mimeType : 'application/mp21'
			},
			'm2a' : {
				mimeType : 'audio/mpeg'
			},
			'm2v' : {
				mimeType : 'video/mpeg'
			},
			'm3a' : {
				mimeType : 'audio/mpeg'
			},
			'm3u' : {
				mimeType : 'audio/x-mpegurl'
			},
			'm3u8' : {
				mimeType : 'application/vnd.apple.mpegurl'
			},
			'm4a' : {
				mimeType : 'audio/mp4'
			},
			'm4b' : {
				mimeType : 'audio/mp4'
			},
			'm4r' : {
				mimeType : 'audio/mp4'
			},
			'm4u' : {
				mimeType : 'video/vnd.mpegurl'
			},
			'm4v' : {
				mimeType : 'video/mp4'
			},
			'ma' : {
				mimeType : 'application/mathematica'
			},
			'mac' : {
				mimeType : 'image/x-macpaint'
			},
			'mads' : {
				mimeType : 'application/mads+xml'
			},
			'mag' : {
				mimeType : 'application/vnd.ecowin.chart'
			},
			'maker' : {
				mimeType : 'application/vnd.framemaker'
			},
			'man' : {
				mimeType : 'text/troff'
			},
			'mar' : {
				mimeType : 'application/octet-stream'
			},
			'mathml' : {
				mimeType : 'application/mathml+xml'
			},
			'mb' : {
				mimeType : 'application/mathematica'
			},
			'mbk' : {
				mimeType : 'application/vnd.mobius.mbk'
			},
			'mbox' : {
				mimeType : 'application/mbox'
			},
			'mc1' : {
				mimeType : 'application/vnd.medcalcdata'
			},
			'mcd' : {
				mimeType : 'application/vnd.mcd'
			},
			'mcurl' : {
				mimeType : 'text/vnd.curl.mcurl'
			},
			'mdb' : {
				mimeType : 'application/x-msaccess'
			},
			'mdi' : {
				mimeType : 'image/vnd.ms-modi'
			},
			'me' : {
				mimeType : 'text/troff'
			},
			'mesh' : {
				mimeType : 'model/mesh'
			},
			'meta4' : {
				mimeType : 'application/metalink4+xml'
			},
			'metalink' : {
				mimeType : 'application/metalink+xml'
			},
			'mets' : {
				mimeType : 'application/mets+xml'
			},
			'mfm' : {
				mimeType : 'application/vnd.mfmp'
			},
			'mft' : {
				mimeType : 'application/rpki-manifest'
			},
			'mgp' : {
				mimeType : 'application/vnd.osgeo.mapguide.package'
			},
			'mgz' : {
				mimeType : 'application/vnd.proteus.magazine'
			},
			'mid' : {
				mimeType : 'audio/midi'
			},
			'midi' : {
				mimeType : 'audio/midi'
			},
			'mie' : {
				mimeType : 'application/x-mie'
			},
			'mif' : {
				mimeType : 'application/x-mif'
			},
			'mime' : {
				mimeType : 'message/rfc822'
			},
			'mj2' : {
				mimeType : 'video/mj2'
			},
			'mjp2' : {
				mimeType : 'video/mj2'
			},
			'mk3d' : {
				mimeType : 'video/x-matroska'
			},
			'mka' : {
				mimeType : 'audio/x-matroska'
			},
			'mks' : {
				mimeType : 'video/x-matroska'
			},
			'mkv' : {
				mimeType : 'video/x-matroska'
			},
			'mlp' : {
				mimeType : 'application/vnd.dolby.mlp'
			},
			'mmd' : {
				mimeType : 'application/vnd.chipnuts.karaoke-mmd'
			},
			'mmf' : {
				mimeType : 'application/vnd.smaf'
			},
			'mmr' : {
				mimeType : 'image/vnd.fujixerox.edmics-mmr'
			},
			'mng' : {
				mimeType : 'video/x-mng'
			},
			'mny' : {
				mimeType : 'application/x-msmoney'
			},
			'mobi' : {
				mimeType : 'application/x-mobipocket-ebook'
			},
			'mods' : {
				mimeType : 'application/mods+xml'
			},
			'mov' : {
				mimeType : 'video/quicktime'
			},
			'movie' : {
				mimeType : 'video/x-sgi-movie'
			},
			'mp1' : {
				mimeType : 'audio/mpeg'
			},
			'mp2' : {
				mimeType : 'audio/mpeg'
			},
			'mp21' : {
				mimeType : 'application/mp21'
			},
			'mp2a' : {
				mimeType : 'audio/mpeg'
			},
			'mp3' : {
				mimeType : 'audio/mpeg'
			},
			'mp4' : {
				mimeType : 'video/mp4'
			},
			'mp4a' : {
				mimeType : 'audio/mp4'
			},
			'mp4s' : {
				mimeType : 'application/mp4'
			},
			'mp4v' : {
				mimeType : 'video/mp4'
			},
			'mpa' : {
				mimeType : 'audio/mpeg'
			},
			'mpc' : {
				mimeType : 'application/vnd.mophun.certificate'
			},
			'mpe' : {
				mimeType : 'video/mpeg'
			},
			'mpeg' : {
				mimeType : 'video/mpeg'
			},
			'mpega' : {
				mimeType : 'audio/x-mpeg'
			},
			'mpg' : {
				mimeType : 'video/mpeg'
			},
			'mpg4' : {
				mimeType : 'video/mp4'
			},
			'mpga' : {
				mimeType : 'audio/mpeg'
			},
			'mpkg' : {
				mimeType : 'application/vnd.apple.installer+xml'
			},
			'mpm' : {
				mimeType : 'application/vnd.blueice.multipass'
			},
			'mpn' : {
				mimeType : 'application/vnd.mophun.application'
			},
			'mpp' : {
				mimeType : 'application/vnd.ms-project'
			},
			'mpt' : {
				mimeType : 'application/vnd.ms-project'
			},
			'mpv2' : {
				mimeType : 'video/mpeg2'
			},
			'mpy' : {
				mimeType : 'application/vnd.ibm.minipay'
			},
			'mqy' : {
				mimeType : 'application/vnd.mobius.mqy'
			},
			'mrc' : {
				mimeType : 'application/marc'
			},
			'mrcx' : {
				mimeType : 'application/marcxml+xml'
			},
			'ms' : {
				mimeType : 'text/troff'
			},
			'mscml' : {
				mimeType : 'application/mediaservercontrol+xml'
			},
			'mseed' : {
				mimeType : 'application/vnd.fdsn.mseed'
			},
			'mseq' : {
				mimeType : 'application/vnd.mseq'
			},
			'msf' : {
				mimeType : 'application/vnd.epson.msf'
			},
			'msh' : {
				mimeType : 'model/mesh'
			},
			'msi' : {
				mimeType : 'application/x-msdownload'
			},
			'msl' : {
				mimeType : 'application/vnd.mobius.msl'
			},
			'msty' : {
				mimeType : 'application/vnd.muvee.style'
			},
			'mts' : {
				mimeType : 'model/vnd.mts'
			},
			'mus' : {
				mimeType : 'application/vnd.musician'
			},
			'musicxml' : {
				mimeType : 'application/vnd.recordare.musicxml+xml'
			},
			'mvb' : {
				mimeType : 'application/x-msmediaview'
			},
			'mwf' : {
				mimeType : 'application/vnd.mfer'
			},
			'mxf' : {
				mimeType : 'application/mxf'
			},
			'mxl' : {
				mimeType : 'application/vnd.recordare.musicxml'
			},
			'mxml' : {
				mimeType : 'application/xv+xml'
			},
			'mxs' : {
				mimeType : 'application/vnd.triscape.mxs'
			},
			'mxu' : {
				mimeType : 'video/vnd.mpegurl'
			},
			'n-gage' : {
				mimeType : 'application/vnd.nokia.n-gage.symbian.install'
			},
			'n3' : {
				mimeType : 'text/n3'
			},
			'nb' : {
				mimeType : 'application/mathematica'
			},
			'nbp' : {
				mimeType : 'application/vnd.wolfram.player'
			},
			'nc' : {
				mimeType : 'application/x-netcdf'
			},
			'ncx' : {
				mimeType : 'application/x-dtbncx+xml'
			},
			'nfo' : {
				mimeType : 'text/x-nfo'
			},
			'ngdat' : {
				mimeType : 'application/vnd.nokia.n-gage.data'
			},
			'nitf' : {
				mimeType : 'application/vnd.nitf'
			},
			'nlu' : {
				mimeType : 'application/vnd.neurolanguage.nlu'
			},
			'nml' : {
				mimeType : 'application/vnd.enliven'
			},
			'nnd' : {
				mimeType : 'application/vnd.noblenet-directory'
			},
			'nns' : {
				mimeType : 'application/vnd.noblenet-sealer'
			},
			'nnw' : {
				mimeType : 'application/vnd.noblenet-web'
			},
			'npx' : {
				mimeType : 'image/vnd.net-fpx'
			},
			'nsc' : {
				mimeType : 'application/x-conference'
			},
			'nsf' : {
				mimeType : 'application/vnd.lotus-notes'
			},
			'ntf' : {
				mimeType : 'application/vnd.nitf'
			},
			'nzb' : {
				mimeType : 'application/x-nzb'
			},
			'oa2' : {
				mimeType : 'application/vnd.fujitsu.oasys2'
			},
			'oa3' : {
				mimeType : 'application/vnd.fujitsu.oasys3'
			},
			'oas' : {
				mimeType : 'application/vnd.fujitsu.oasys'
			},
			'obd' : {
				mimeType : 'application/x-msbinder'
			},
			'obj' : {
				mimeType : 'application/x-tgif'
			},
			'oda' : {
				mimeType : 'application/oda'
			},
			'odb' : {
				mimeType : 'application/vnd.oasis.opendocument.database'
			},
			'odc' : {
				mimeType : 'application/vnd.oasis.opendocument.chart'
			},
			'odf' : {
				mimeType : 'application/vnd.oasis.opendocument.formula'
			},
			'odft' : {
				mimeType : 'application/vnd.oasis.opendocument.formula-template'
			},
			'odg' : {
				mimeType : 'application/vnd.oasis.opendocument.graphics'
			},
			'odi' : {
				mimeType : 'application/vnd.oasis.opendocument.image'
			},
			'odm' : {
				mimeType : 'application/vnd.oasis.opendocument.text-master'
			},
			'odp' : {
				mimeType : 'application/vnd.oasis.opendocument.presentation'
			},
			'ods' : {
				mimeType : 'application/vnd.oasis.opendocument.spreadsheet'
			},
			'odt' : {
				mimeType : 'application/vnd.oasis.opendocument.text'
			},
			'oga' : {
				mimeType : 'audio/ogg'
			},
			'ogg' : {
				mimeType : 'audio/ogg'
			},
			'ogv' : {
				mimeType : 'video/ogg'
			},
			'ogx' : {
				mimeType : 'application/ogg'
			},
			'omdoc' : {
				mimeType : 'application/omdoc+xml'
			},
			'onepkg' : {
				mimeType : 'application/onenote'
			},
			'onetmp' : {
				mimeType : 'application/onenote'
			},
			'onetoc' : {
				mimeType : 'application/onenote'
			},
			'onetoc2' : {
				mimeType : 'application/onenote'
			},
			'opf' : {
				mimeType : 'application/oebps-package+xml'
			},
			'opml' : {
				mimeType : 'text/x-opml'
			},
			'oprc' : {
				mimeType : 'application/vnd.palm'
			},
			'org' : {
				mimeType : 'application/vnd.lotus-organizer'
			},
			'osf' : {
				mimeType : 'application/vnd.yamaha.openscoreformat'
			},
			'osfpvg' : {
				mimeType : 'application/vnd.yamaha.openscoreformat.osfpvg+xml'
			},
			'otc' : {
				mimeType : 'application/vnd.oasis.opendocument.chart-template'
			},
			'otf' : {
				mimeType : 'application/x-font-otf'
			},
			'otg' : {
				mimeType : 'application/vnd.oasis.opendocument.graphics-template'
			},
			'oth' : {
				mimeType : 'application/vnd.oasis.opendocument.text-web'
			},
			'oti' : {
				mimeType : 'application/vnd.oasis.opendocument.image-template'
			},
			'otp' : {
				mimeType : 'application/vnd.oasis.opendocument.presentation-template'
			},
			'ots' : {
				mimeType : 'application/vnd.oasis.opendocument.spreadsheet-template'
			},
			'ott' : {
				mimeType : 'application/vnd.oasis.opendocument.text-template'
			},
			'oxps' : {
				mimeType : 'application/oxps'
			},
			'oxt' : {
				mimeType : 'application/vnd.openofficeorg.extension'
			},
			'p' : {
				mimeType : 'text/x-pascal'
			},
			'p10' : {
				mimeType : 'application/pkcs10'
			},
			'p12' : {
				mimeType : 'application/x-pkcs12'
			},
			'p7b' : {
				mimeType : 'application/x-pkcs7-certificates'
			},
			'p7c' : {
				mimeType : 'application/pkcs7-mime'
			},
			'p7m' : {
				mimeType : 'application/pkcs7-mime'
			},
			'p7r' : {
				mimeType : 'application/x-pkcs7-certreqresp'
			},
			'p7s' : {
				mimeType : 'application/pkcs7-signature'
			},
			'p8' : {
				mimeType : 'application/pkcs8'
			},
			'pas' : {
				mimeType : 'text/x-pascal'
			},
			'paw' : {
				mimeType : 'application/vnd.pawaafile'
			},
			'pbd' : {
				mimeType : 'application/vnd.powerbuilder6'
			},
			'pbm' : {
				mimeType : 'image/x-portable-bitmap'
			},
			'pcap' : {
				mimeType : 'application/vnd.tcpdump.pcap'
			},
			'pcf' : {
				mimeType : 'application/x-font-pcf'
			},
			'pcl' : {
				mimeType : 'application/vnd.hp-pcl'
			},
			'pclxl' : {
				mimeType : 'application/vnd.hp-pclxl'
			},
			'pct' : {
				mimeType : 'image/pict'
			},
			'pcurl' : {
				mimeType : 'application/vnd.curl.pcurl'
			},
			'pcx' : {
				mimeType : 'image/x-pcx'
			},
			'pdb' : {
				mimeType : 'application/vnd.palm'
			},
			'pdf' : {
				mimeType : 'application/pdf'
			},
			'pfa' : {
				mimeType : 'application/x-font-type1'
			},
			'pfb' : {
				mimeType : 'application/x-font-type1'
			},
			'pfm' : {
				mimeType : 'application/x-font-type1'
			},
			'pfr' : {
				mimeType : 'application/font-tdpfr'
			},
			'pfx' : {
				mimeType : 'application/x-pkcs12'
			},
			'pgm' : {
				mimeType : 'image/x-portable-graymap'
			},
			'pgn' : {
				mimeType : 'application/x-chess-pgn'
			},
			'pgp' : {
				mimeType : 'application/pgp-encrypted'
			},
			'pic' : {
				mimeType : 'image/pict'
			},
			'pict' : {
				mimeType : 'image/pict'
			},
			'pkg' : {
				mimeType : 'application/octet-stream'
			},
			'pki' : {
				mimeType : 'application/pkixcmp'
			},
			'pkipath' : {
				mimeType : 'application/pkix-pkipath'
			},
			'plb' : {
				mimeType : 'application/vnd.3gpp.pic-bw-large'
			},
			'plc' : {
				mimeType : 'application/vnd.mobius.plc'
			},
			'plf' : {
				mimeType : 'application/vnd.pocketlearn'
			},
			'pls' : {
				mimeType : 'audio/x-scpls'
			},
			'pml' : {
				mimeType : 'application/vnd.ctc-posml'
			},
			'png' : {
				mimeType : 'image/png'
			},
			'pnm' : {
				mimeType : 'image/x-portable-anymap'
			},
			'pnt' : {
				mimeType : 'image/x-macpaint'
			},
			'portpkg' : {
				mimeType : 'application/vnd.macports.portpkg'
			},
			'pot' : {
				mimeType : 'application/vnd.ms-powerpoint'
			},
			'potm' : {
				mimeType : 'application/vnd.ms-powerpoint.template.macroenabled.12'
			},
			'potx' : {
				mimeType : 'application/vnd.openxmlformats-officedocument.presentationml.template'
			},
			'ppam' : {
				mimeType : 'application/vnd.ms-powerpoint.addin.macroenabled.12'
			},
			'ppd' : {
				mimeType : 'application/vnd.cups-ppd'
			},
			'ppm' : {
				mimeType : 'image/x-portable-pixmap'
			},
			'pps' : {
				mimeType : 'application/vnd.ms-powerpoint'
			},
			'ppsm' : {
				mimeType : 'application/vnd.ms-powerpoint.slideshow.macroenabled.12'
			},
			'ppsx' : {
				mimeType : 'application/vnd.openxmlformats-officedocument.presentationml.slideshow'
			},
			'ppt' : {
				mimeType : 'application/vnd.ms-powerpoint'
			},
			'pptm' : {
				mimeType : 'application/vnd.ms-powerpoint.presentation.macroenabled.12'
			},
			'pptx' : {
				mimeType : 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
			},
			'pqa' : {
				mimeType : 'application/vnd.palm'
			},
			'prc' : {
				mimeType : 'application/x-mobipocket-ebook'
			},
			'pre' : {
				mimeType : 'application/vnd.lotus-freelance'
			},
			'prf' : {
				mimeType : 'application/pics-rules'
			},
			'ps' : {
				mimeType : 'application/postscript'
			},
			'psb' : {
				mimeType : 'application/vnd.3gpp.pic-bw-small'
			},
			'psd' : {
				mimeType : 'image/vnd.adobe.photoshop'
			},
			'psf' : {
				mimeType : 'application/x-font-linux-psf'
			},
			'pskcxml' : {
				mimeType : 'application/pskc+xml'
			},
			'ptid' : {
				mimeType : 'application/vnd.pvi.ptid1'
			},
			'pub' : {
				mimeType : 'application/x-mspublisher'
			},
			'pvb' : {
				mimeType : 'application/vnd.3gpp.pic-bw-var'
			},
			'pwn' : {
				mimeType : 'application/vnd.3m.post-it-notes'
			},
			'pya' : {
				mimeType : 'audio/vnd.ms-playready.media.pya'
			},
			'pyv' : {
				mimeType : 'video/vnd.ms-playready.media.pyv'
			},
			'qam' : {
				mimeType : 'application/vnd.epson.quickanime'
			},
			'qbo' : {
				mimeType : 'application/vnd.intu.qbo'
			},
			'qfx' : {
				mimeType : 'application/vnd.intu.qfx'
			},
			'qps' : {
				mimeType : 'application/vnd.publishare-delta-tree'
			},
			'qt' : {
				mimeType : 'video/quicktime'
			},
			'qti' : {
				mimeType : 'image/x-quicktime'
			},
			'qtif' : {
				mimeType : 'image/x-quicktime'
			},
			'qwd' : {
				mimeType : 'application/vnd.quark.quarkxpress'
			},
			'qwt' : {
				mimeType : 'application/vnd.quark.quarkxpress'
			},
			'qxb' : {
				mimeType : 'application/vnd.quark.quarkxpress'
			},
			'qxd' : {
				mimeType : 'application/vnd.quark.quarkxpress'
			},
			'qxl' : {
				mimeType : 'application/vnd.quark.quarkxpress'
			},
			'qxt' : {
				mimeType : 'application/vnd.quark.quarkxpress'
			},
			'ra' : {
				mimeType : 'audio/x-pn-realaudio'
			},
			'ram' : {
				mimeType : 'audio/x-pn-realaudio'
			},
			'rar' : {
				mimeType : 'application/x-rar-compressed'
			},
			'ras' : {
				mimeType : 'image/x-cmu-raster'
			},
			'rcprofile' : {
				mimeType : 'application/vnd.ipunplugged.rcprofile'
			},
			'rdf' : {
				mimeType : 'application/rdf+xml'
			},
			'rdz' : {
				mimeType : 'application/vnd.data-vision.rdz'
			},
			'rep' : {
				mimeType : 'application/vnd.businessobjects'
			},
			'res' : {
				mimeType : 'application/x-dtbresource+xml'
			},
			'rgb' : {
				mimeType : 'image/x-rgb'
			},
			'rif' : {
				mimeType : 'application/reginfo+xml'
			},
			'rip' : {
				mimeType : 'audio/vnd.rip'
			},
			'ris' : {
				mimeType : 'application/x-research-info-systems'
			},
			'rl' : {
				mimeType : 'application/resource-lists+xml'
			},
			'rlc' : {
				mimeType : 'image/vnd.fujixerox.edmics-rlc'
			},
			'rld' : {
				mimeType : 'application/resource-lists-diff+xml'
			},
			'rm' : {
				mimeType : 'application/vnd.rn-realmedia'
			},
			'rmi' : {
				mimeType : 'audio/midi'
			},
			'rmp' : {
				mimeType : 'audio/x-pn-realaudio-plugin'
			},
			'rms' : {
				mimeType : 'application/vnd.jcp.javame.midlet-rms'
			},
			'rmvb' : {
				mimeType : 'application/vnd.rn-realmedia-vbr'
			},
			'rnc' : {
				mimeType : 'application/relax-ng-compact-syntax'
			},
			'roa' : {
				mimeType : 'application/rpki-roa'
			},
			'roff' : {
				mimeType : 'text/troff'
			},
			'rp9' : {
				mimeType : 'application/vnd.cloanto.rp9'
			},
			'rpss' : {
				mimeType : 'application/vnd.nokia.radio-presets'
			},
			'rpst' : {
				mimeType : 'application/vnd.nokia.radio-preset'
			},
			'rq' : {
				mimeType : 'application/sparql-query'
			},
			'rs' : {
				mimeType : 'application/rls-services+xml'
			},
			'rsd' : {
				mimeType : 'application/rsd+xml'
			},
			'rss' : {
				mimeType : 'application/rss+xml'
			},
			'rtf' : {
				mimeType : 'application/rtf'
			},
			'rtx' : {
				mimeType : 'text/richtext'
			},
			's' : {
				mimeType : 'text/x-asm'
			},
			's3m' : {
				mimeType : 'audio/s3m'
			},
			'saf' : {
				mimeType : 'application/vnd.yamaha.smaf-audio'
			},
			'sbml' : {
				mimeType : 'application/sbml+xml'
			},
			'sc' : {
				mimeType : 'application/vnd.ibm.secure-container'
			},
			'scd' : {
				mimeType : 'application/x-msschedule'
			},
			'scm' : {
				mimeType : 'application/vnd.lotus-screencam'
			},
			'scq' : {
				mimeType : 'application/scvp-cv-request'
			},
			'scs' : {
				mimeType : 'application/scvp-cv-response'
			},
			'scurl' : {
				mimeType : 'text/vnd.curl.scurl'
			},
			'sda' : {
				mimeType : 'application/vnd.stardivision.draw'
			},
			'sdc' : {
				mimeType : 'application/vnd.stardivision.calc'
			},
			'sdd' : {
				mimeType : 'application/vnd.stardivision.impress'
			},
			'sdkd' : {
				mimeType : 'application/vnd.solent.sdkm+xml'
			},
			'sdkm' : {
				mimeType : 'application/vnd.solent.sdkm+xml'
			},
			'sdp' : {
				mimeType : 'application/sdp'
			},
			'sdw' : {
				mimeType : 'application/vnd.stardivision.writer'
			},
			'see' : {
				mimeType : 'application/vnd.seemail'
			},
			'seed' : {
				mimeType : 'application/vnd.fdsn.seed'
			},
			'sema' : {
				mimeType : 'application/vnd.sema'
			},
			'semd' : {
				mimeType : 'application/vnd.semd'
			},
			'semf' : {
				mimeType : 'application/vnd.semf'
			},
			'ser' : {
				mimeType : 'application/java-serialized-object'
			},
			'setpay' : {
				mimeType : 'application/set-payment-initiation'
			},
			'setreg' : {
				mimeType : 'application/set-registration-initiation'
			},
			'sfd-hdstx' : {
				mimeType : 'application/vnd.hydrostatix.sof-data'
			},
			'sfs' : {
				mimeType : 'application/vnd.spotfire.sfs'
			},
			'sfv' : {
				mimeType : 'text/x-sfv'
			},
			'sgi' : {
				mimeType : 'image/sgi'
			},
			'sgl' : {
				mimeType : 'application/vnd.stardivision.writer-global'
			},
			'sgm' : {
				mimeType : 'text/sgml'
			},
			'sgml' : {
				mimeType : 'text/sgml'
			},
			'sh' : {
				mimeType : 'application/x-sh'
			},
			'shar' : {
				mimeType : 'application/x-shar'
			},
			'shf' : {
				mimeType : 'application/shf+xml'
			},
			'sid' : {
				mimeType : 'image/x-mrsid-image'
			},
			'sig' : {
				mimeType : 'application/pgp-signature'
			},
			'sil' : {
				mimeType : 'audio/silk'
			},
			'silo' : {
				mimeType : 'model/mesh'
			},
			'sis' : {
				mimeType : 'application/vnd.symbian.install'
			},
			'sisx' : {
				mimeType : 'application/vnd.symbian.install'
			},
			'sit' : {
				mimeType : 'application/x-stuffit'
			},
			'sitx' : {
				mimeType : 'application/x-stuffitx'
			},
			'skd' : {
				mimeType : 'application/vnd.koan'
			},
			'skm' : {
				mimeType : 'application/vnd.koan'
			},
			'skp' : {
				mimeType : 'application/vnd.koan'
			},
			'skt' : {
				mimeType : 'application/vnd.koan'
			},
			'sldm' : {
				mimeType : 'application/vnd.ms-powerpoint.slide.macroenabled.12'
			},
			'sldx' : {
				mimeType : 'application/vnd.openxmlformats-officedocument.presentationml.slide'
			},
			'slt' : {
				mimeType : 'application/vnd.epson.salt'
			},
			'sm' : {
				mimeType : 'application/vnd.stepmania.stepchart'
			},
			'smf' : {
				mimeType : 'application/vnd.stardivision.math'
			},
			'smi' : {
				mimeType : 'application/smil+xml'
			},
			'smil' : {
				mimeType : 'application/smil+xml'
			},
			'smv' : {
				mimeType : 'video/x-smv'
			},
			'smzip' : {
				mimeType : 'application/vnd.stepmania.package'
			},
			'snd' : {
				mimeType : 'audio/basic'
			},
			'snf' : {
				mimeType : 'application/x-font-snf'
			},
			'so' : {
				mimeType : 'application/octet-stream'
			},
			'spc' : {
				mimeType : 'application/x-pkcs7-certificates'
			},
			'spf' : {
				mimeType : 'application/vnd.yamaha.smaf-phrase'
			},
			'spl' : {
				mimeType : 'application/x-futuresplash'
			},
			'spot' : {
				mimeType : 'text/vnd.in3d.spot'
			},
			'spp' : {
				mimeType : 'application/scvp-vp-response'
			},
			'spq' : {
				mimeType : 'application/scvp-vp-request'
			},
			'spx' : {
				mimeType : 'audio/ogg'
			},
			'sql' : {
				mimeType : 'application/x-sql'
			},
			'src' : {
				mimeType : 'application/x-wais-source'
			},
			'srt' : {
				mimeType : 'application/x-subrip'
			},
			'sru' : {
				mimeType : 'application/sru+xml'
			},
			'srx' : {
				mimeType : 'application/sparql-results+xml'
			},
			'ssdl' : {
				mimeType : 'application/ssdl+xml'
			},
			'sse' : {
				mimeType : 'application/vnd.kodak-descriptor'
			},
			'ssf' : {
				mimeType : 'application/vnd.epson.ssf'
			},
			'ssml' : {
				mimeType : 'application/ssml+xml'
			},
			'st' : {
				mimeType : 'application/vnd.sailingtracker.track'
			},
			'stc' : {
				mimeType : 'application/vnd.sun.xml.calc.template'
			},
			'std' : {
				mimeType : 'application/vnd.sun.xml.draw.template'
			},
			'stf' : {
				mimeType : 'application/vnd.wt.stf'
			},
			'sti' : {
				mimeType : 'application/vnd.sun.xml.impress.template'
			},
			'stk' : {
				mimeType : 'application/hyperstudio'
			},
			'stl' : {
				mimeType : 'application/vnd.ms-pki.stl'
			},
			'str' : {
				mimeType : 'application/vnd.pg.format'
			},
			'stw' : {
				mimeType : 'application/vnd.sun.xml.writer.template'
			},
			'sub' : {
				mimeType : 'text/vnd.dvb.subtitle'
			},
			'sus' : {
				mimeType : 'application/vnd.sus-calendar'
			},
			'susp' : {
				mimeType : 'application/vnd.sus-calendar'
			},
			'sv4cpio' : {
				mimeType : 'application/x-sv4cpio'
			},
			'sv4crc' : {
				mimeType : 'application/x-sv4crc'
			},
			'svc' : {
				mimeType : 'application/vnd.dvb.service'
			},
			'svd' : {
				mimeType : 'application/vnd.svd'
			},
			'svg' : {
				mimeType : 'image/svg+xml'
			},
			'svgz' : {
				mimeType : 'image/svg+xml'
			},
			'swa' : {
				mimeType : 'application/x-director'
			},
			'swf' : {
				mimeType : 'application/x-shockwave-flash'
			},
			'swi' : {
				mimeType : 'application/vnd.aristanetworks.swi'
			},
			'sxc' : {
				mimeType : 'application/vnd.sun.xml.calc'
			},
			'sxd' : {
				mimeType : 'application/vnd.sun.xml.draw'
			},
			'sxg' : {
				mimeType : 'application/vnd.sun.xml.writer.global'
			},
			'sxi' : {
				mimeType : 'application/vnd.sun.xml.impress'
			},
			'sxm' : {
				mimeType : 'application/vnd.sun.xml.math'
			},
			'sxw' : {
				mimeType : 'application/vnd.sun.xml.writer'
			},
			't' : {
				mimeType : 'text/troff'
			},
			't3' : {
				mimeType : 'application/x-t3vm-image'
			},
			'taglet' : {
				mimeType : 'application/vnd.mynfc'
			},
			'tao' : {
				mimeType : 'application/vnd.tao.intent-module-archive'
			},
			'tar' : {
				mimeType : 'application/x-tar'
			},
			'tcap' : {
				mimeType : 'application/vnd.3gpp2.tcap'
			},
			'tcl' : {
				mimeType : 'application/x-tcl'
			},
			'teacher' : {
				mimeType : 'application/vnd.smart.teacher'
			},
			'tei' : {
				mimeType : 'application/tei+xml'
			},
			'teicorpus' : {
				mimeType : 'application/tei+xml'
			},
			'tex' : {
				mimeType : 'application/x-tex'
			},
			'texi' : {
				mimeType : 'application/x-texinfo'
			},
			'texinfo' : {
				mimeType : 'application/x-texinfo'
			},
			'text' : {
				mimeType : 'text/plain'
			},
			'tfi' : {
				mimeType : 'application/thraud+xml'
			},
			'tfm' : {
				mimeType : 'application/x-tex-tfm'
			},
			'tga' : {
				mimeType : 'image/x-tga'
			},
			'thmx' : {
				mimeType : 'application/vnd.ms-officetheme'
			},
			'tif' : {
				mimeType : 'image/tiff'
			},
			'tiff' : {
				mimeType : 'image/tiff'
			},
			'tmo' : {
				mimeType : 'application/vnd.tmobile-livetv'
			},
			'torrent' : {
				mimeType : 'application/x-bittorrent'
			},
			'tpl' : {
				mimeType : 'application/vnd.groove-tool-template'
			},
			'tpt' : {
				mimeType : 'application/vnd.trid.tpt'
			},
			'tr' : {
				mimeType : 'text/troff'
			},
			'tra' : {
				mimeType : 'application/vnd.trueapp'
			},
			'trm' : {
				mimeType : 'application/x-msterminal'
			},
			'tsd' : {
				mimeType : 'application/timestamped-data'
			},
			'tsv' : {
				mimeType : 'text/tab-separated-values'
			},
			'ttc' : {
				mimeType : 'application/x-font-ttf'
			},
			'ttf' : {
				mimeType : 'application/x-font-ttf'
			},
			'ttl' : {
				mimeType : 'text/turtle'
			},
			'twd' : {
				mimeType : 'application/vnd.simtech-mindmapper'
			},
			'twds' : {
				mimeType : 'application/vnd.simtech-mindmapper'
			},
			'txd' : {
				mimeType : 'application/vnd.genomatix.tuxedo'
			},
			'txf' : {
				mimeType : 'application/vnd.mobius.txf'
			},
			'txt' : {
				mimeType : 'text/plain'
			},
			'u32' : {
				mimeType : 'application/x-authorware-bin'
			},
			'udeb' : {
				mimeType : 'application/x-debian-package'
			},
			'ufd' : {
				mimeType : 'application/vnd.ufdl'
			},
			'ufdl' : {
				mimeType : 'application/vnd.ufdl'
			},
			'ulw' : {
				mimeType : 'audio/basic'
			},
			'ulx' : {
				mimeType : 'application/x-glulx'
			},
			'umj' : {
				mimeType : 'application/vnd.umajin'
			},
			'unityweb' : {
				mimeType : 'application/vnd.unity'
			},
			'uoml' : {
				mimeType : 'application/vnd.uoml+xml'
			},
			'uri' : {
				mimeType : 'text/uri-list'
			},
			'uris' : {
				mimeType : 'text/uri-list'
			},
			'urls' : {
				mimeType : 'text/uri-list'
			},
			'ustar' : {
				mimeType : 'application/x-ustar'
			},
			'utz' : {
				mimeType : 'application/vnd.uiq.theme'
			},
			'uu' : {
				mimeType : 'text/x-uuencode'
			},
			'uva' : {
				mimeType : 'audio/vnd.dece.audio'
			},
			'uvd' : {
				mimeType : 'application/vnd.dece.data'
			},
			'uvf' : {
				mimeType : 'application/vnd.dece.data'
			},
			'uvg' : {
				mimeType : 'image/vnd.dece.graphic'
			},
			'uvh' : {
				mimeType : 'video/vnd.dece.hd'
			},
			'uvi' : {
				mimeType : 'image/vnd.dece.graphic'
			},
			'uvm' : {
				mimeType : 'video/vnd.dece.mobile'
			},
			'uvp' : {
				mimeType : 'video/vnd.dece.pd'
			},
			'uvs' : {
				mimeType : 'video/vnd.dece.sd'
			},
			'uvt' : {
				mimeType : 'application/vnd.dece.ttml+xml'
			},
			'uvu' : {
				mimeType : 'video/vnd.uvvu.mp4'
			},
			'uvv' : {
				mimeType : 'video/vnd.dece.video'
			},
			'uvva' : {
				mimeType : 'audio/vnd.dece.audio'
			},
			'uvvd' : {
				mimeType : 'application/vnd.dece.data'
			},
			'uvvf' : {
				mimeType : 'application/vnd.dece.data'
			},
			'uvvg' : {
				mimeType : 'image/vnd.dece.graphic'
			},
			'uvvh' : {
				mimeType : 'video/vnd.dece.hd'
			},
			'uvvi' : {
				mimeType : 'image/vnd.dece.graphic'
			},
			'uvvm' : {
				mimeType : 'video/vnd.dece.mobile'
			},
			'uvvp' : {
				mimeType : 'video/vnd.dece.pd'
			},
			'uvvs' : {
				mimeType : 'video/vnd.dece.sd'
			},
			'uvvt' : {
				mimeType : 'application/vnd.dece.ttml+xml'
			},
			'uvvu' : {
				mimeType : 'video/vnd.uvvu.mp4'
			},
			'uvvv' : {
				mimeType : 'video/vnd.dece.video'
			},
			'uvvx' : {
				mimeType : 'application/vnd.dece.unspecified'
			},
			'uvvz' : {
				mimeType : 'application/vnd.dece.zip'
			},
			'uvx' : {
				mimeType : 'application/vnd.dece.unspecified'
			},
			'uvz' : {
				mimeType : 'application/vnd.dece.zip'
			},
			'vcard' : {
				mimeType : 'text/vcard'
			},
			'vcd' : {
				mimeType : 'application/x-cdlink'
			},
			'vcf' : {
				mimeType : 'text/x-vcard'
			},
			'vcg' : {
				mimeType : 'application/vnd.groove-vcard'
			},
			'vcs' : {
				mimeType : 'text/x-vcalendar'
			},
			'vcx' : {
				mimeType : 'application/vnd.vcx'
			},
			'vis' : {
				mimeType : 'application/vnd.visionary'
			},
			'viv' : {
				mimeType : 'video/vnd.vivo'
			},
			'vob' : {
				mimeType : 'video/x-ms-vob'
			},
			'vor' : {
				mimeType : 'application/vnd.stardivision.writer'
			},
			'vox' : {
				mimeType : 'application/x-authorware-bin'
			},
			'vrml' : {
				mimeType : 'model/vrml'
			},
			'vsd' : {
				mimeType : 'application/vnd.visio'
			},
			'vsf' : {
				mimeType : 'application/vnd.vsf'
			},
			'vss' : {
				mimeType : 'application/vnd.visio'
			},
			'vst' : {
				mimeType : 'application/vnd.visio'
			},
			'vsw' : {
				mimeType : 'application/vnd.visio'
			},
			'vtu' : {
				mimeType : 'model/vnd.vtu'
			},
			'vxml' : {
				mimeType : 'application/voicexml+xml'
			},
			'w3d' : {
				mimeType : 'application/x-director'
			},
			'wad' : {
				mimeType : 'application/x-doom'
			},
			'wav' : {
				mimeType : 'audio/x-wav'
			},
			'wax' : {
				mimeType : 'audio/x-ms-wax'
			},
			'wbmp' : {
				mimeType : 'image/vnd.wap.wbmp'
			},
			'wbs' : {
				mimeType : 'application/vnd.criticaltools.wbs+xml'
			},
			'wbxml' : {
				mimeType : 'application/vnd.wap.wbxml'
			},
			'wcm' : {
				mimeType : 'application/vnd.ms-works'
			},
			'wdb' : {
				mimeType : 'application/vnd.ms-works'
			},
			'wdp' : {
				mimeType : 'image/vnd.ms-photo'
			},
			'weba' : {
				mimeType : 'audio/webm'
			},
			'webm' : {
				mimeType : 'video/webm'
			},
			'webp' : {
				mimeType : 'image/webp'
			},
			'wg' : {
				mimeType : 'application/vnd.pmi.widget'
			},
			'wgt' : {
				mimeType : 'application/widget'
			},
			'wks' : {
				mimeType : 'application/vnd.ms-works'
			},
			'wm' : {
				mimeType : 'video/x-ms-wm'
			},
			'wma' : {
				mimeType : 'audio/x-ms-wma'
			},
			'wmd' : {
				mimeType : 'application/x-ms-wmd'
			},
			'wmf' : {
				mimeType : 'application/x-msmetafile'
			},
			'wml' : {
				mimeType : 'text/vnd.wap.wml'
			},
			'wmlc' : {
				mimeType : 'application/vnd.wap.wmlc'
			},
			'wmls' : {
				mimeType : 'text/vnd.wap.wmlscript'
			},
			'wmlsc' : {
				mimeType : 'application/vnd.wap.wmlscriptc'
			},
			'wmv' : {
				mimeType : 'video/x-ms-wmv'
			},
			'wmx' : {
				mimeType : 'video/x-ms-wmx'
			},
			'wmz' : {
				mimeType : 'application/x-msmetafile'
			},
			'woff' : {
				mimeType : 'application/x-font-woff'
			},
			'wpd' : {
				mimeType : 'application/vnd.wordperfect'
			},
			'wpl' : {
				mimeType : 'application/vnd.ms-wpl'
			},
			'wps' : {
				mimeType : 'application/vnd.ms-works'
			},
			'wqd' : {
				mimeType : 'application/vnd.wqd'
			},
			'wri' : {
				mimeType : 'application/x-mswrite'
			},
			'wrl' : {
				mimeType : 'model/vrml'
			},
			'wsdl' : {
				mimeType : 'application/wsdl+xml'
			},
			'wspolicy' : {
				mimeType : 'application/wspolicy+xml'
			},
			'wtb' : {
				mimeType : 'application/vnd.webturbo'
			},
			'wvx' : {
				mimeType : 'video/x-ms-wvx'
			},
			'x32' : {
				mimeType : 'application/x-authorware-bin'
			},
			'x3d' : {
				mimeType : 'model/x3d+xml'
			},
			'x3db' : {
				mimeType : 'model/x3d+binary'
			},
			'x3dbz' : {
				mimeType : 'model/x3d+binary'
			},
			'x3dv' : {
				mimeType : 'model/x3d+vrml'
			},
			'x3dvz' : {
				mimeType : 'model/x3d+vrml'
			},
			'x3dz' : {
				mimeType : 'model/x3d+xml'
			},
			'xaml' : {
				mimeType : 'application/xaml+xml'
			},
			'xap' : {
				mimeType : 'application/x-silverlight-app'
			},
			'xar' : {
				mimeType : 'application/vnd.xara'
			},
			'xbap' : {
				mimeType : 'application/x-ms-xbap'
			},
			'xbd' : {
				mimeType : 'application/vnd.fujixerox.docuworks.binder'
			},
			'xbm' : {
				mimeType : 'image/x-xbitmap'
			},
			'xdf' : {
				mimeType : 'application/xcap-diff+xml'
			},
			'xdm' : {
				mimeType : 'application/vnd.syncml.dm+xml'
			},
			'xdp' : {
				mimeType : 'application/vnd.adobe.xdp+xml'
			},
			'xdssc' : {
				mimeType : 'application/dssc+xml'
			},
			'xdw' : {
				mimeType : 'application/vnd.fujixerox.docuworks'
			},
			'xenc' : {
				mimeType : 'application/xenc+xml'
			},
			'xer' : {
				mimeType : 'application/patch-ops-error+xml'
			},
			'xfdf' : {
				mimeType : 'application/vnd.adobe.xfdf'
			},
			'xfdl' : {
				mimeType : 'application/vnd.xfdl'
			},
			'xht' : {
				mimeType : 'application/xhtml+xml'
			},
			'xhtml' : {
				mimeType : 'application/xhtml+xml'
			},
			'xhvml' : {
				mimeType : 'application/xv+xml'
			},
			'xif' : {
				mimeType : 'image/vnd.xiff'
			},
			'xla' : {
				mimeType : 'application/vnd.ms-excel'
			},
			'xlam' : {
				mimeType : 'application/vnd.ms-excel.addin.macroenabled.12'
			},
			'xlc' : {
				mimeType : 'application/vnd.ms-excel'
			},
			'xlf' : {
				mimeType : 'application/x-xliff+xml'
			},
			'xlm' : {
				mimeType : 'application/vnd.ms-excel'
			},
			'xls' : {
				mimeType : 'application/vnd.ms-excel'
			},
			'xlsb' : {
				mimeType : 'application/vnd.ms-excel.sheet.binary.macroenabled.12'
			},
			'xlsm' : {
				mimeType : 'application/vnd.ms-excel.sheet.macroenabled.12'
			},
			'xlsx' : {
				mimeType : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			},
			'xlt' : {
				mimeType : 'application/vnd.ms-excel'
			},
			'xltm' : {
				mimeType : 'application/vnd.ms-excel.template.macroenabled.12'
			},
			'xltx' : {
				mimeType : 'application/vnd.openxmlformats-officedocument.spreadsheetml.template'
			},
			'xlw' : {
				mimeType : 'application/vnd.ms-excel'
			},
			'xm' : {
				mimeType : 'audio/xm'
			},
			'xml' : {
				mimeType : 'application/xml'
			},
			'xo' : {
				mimeType : 'application/vnd.olpc-sugar'
			},
			'xop' : {
				mimeType : 'application/xop+xml'
			},
			'xpi' : {
				mimeType : 'application/x-xpinstall'
			},
			'xpl' : {
				mimeType : 'application/xproc+xml'
			},
			'xpm' : {
				mimeType : 'image/x-xpixmap'
			},
			'xpr' : {
				mimeType : 'application/vnd.is-xpr'
			},
			'xps' : {
				mimeType : 'application/vnd.ms-xpsdocument'
			},
			'xpw' : {
				mimeType : 'application/vnd.intercon.formnet'
			},
			'xpx' : {
				mimeType : 'application/vnd.intercon.formnet'
			},
			'xsl' : {
				mimeType : 'application/xml'
			},
			'xslt' : {
				mimeType : 'application/xslt+xml'
			},
			'xsm' : {
				mimeType : 'application/vnd.syncml+xml'
			},
			'xspf' : {
				mimeType : 'application/xspf+xml'
			},
			'xul' : {
				mimeType : 'application/vnd.mozilla.xul+xml'
			},
			'xvm' : {
				mimeType : 'application/xv+xml'
			},
			'xvml' : {
				mimeType : 'application/xv+xml'
			},
			'xwd' : {
				mimeType : 'image/x-xwindowdump'
			},
			'xyz' : {
				mimeType : 'chemical/x-xyz'
			},
			'xz' : {
				mimeType : 'application/x-xz'
			},
			'yang' : {
				mimeType : 'application/yang'
			},
			'yin' : {
				mimeType : 'application/yin+xml'
			},
			'z' : {
				mimeType : 'application/x-compress'
			},
			'Z' : {
				mimeType : 'application/x-compress'
			},
			'z1' : {
				mimeType : 'application/x-zmachine'
			},
			'z2' : {
				mimeType : 'application/x-zmachine'
			},
			'z3' : {
				mimeType : 'application/x-zmachine'
			},
			'z4' : {
				mimeType : 'application/x-zmachine'
			},
			'z5' : {
				mimeType : 'application/x-zmachine'
			},
			'z6' : {
				mimeType : 'application/x-zmachine'
			},
			'z7' : {
				mimeType : 'application/x-zmachine'
			},
			'z8' : {
				mimeType : 'application/x-zmachine'
			},
			'zaz' : {
				mimeType : 'application/vnd.zzazz.deck+xml'
			},
			'zip' : {
				mimeType : 'application/zip'
			},
			'zir' : {
				mimeType : 'application/vnd.zul'
			},
			'zirz' : {
				mimeType : 'application/vnd.zul'
			},
			'zmm' : {
				mimeType : 'application/vnd.handheld-entertainment+xml'
			}
		}
	}
	module.exports = Http.Config;
})(require("./Qmiks"));