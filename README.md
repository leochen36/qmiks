Qmiks ��һ���������˵�javascript�������,Ŀǰ������ nodejs
ʹ��˵��:
Qmiks.js�ǻ�������ļ�
	�ṩ����:
           	encode(str),
            decode(str)
            isFun(fun)
            isFunction(fun)
            isNum(val)
            isNumber(val)
            isArray(array)
            likeArray(array)
            isBool(val)
            isString(str)
            isRegExp(exp)
            isDate(val)
            isObject(obj)
            isPlainObject(obj)
            isNull(val)
            likeNull(val)
            trim(str)
            array(map)//ת��Ϊ����
            inArray(value, array)//�����������λ
            rmArray(value, array)//ɾ������valueֵ
            unique(array)//������ȥ��
            contains(source, child)//source�Ƿ���� child
            inherit(subClass, superClass)// 
																		        �̳���
																		        ����subClass�̳и���superClass�����Է���,
																		        ע:�����и�������Լ�����ʱ,���ᱻ�����滻
																		    
            each(source, callback) //���� 
            merge()	    // �ϲ����������
										        ������������
										        ˵��:1. �����һ������������,�ͻ�Ѻ������(��������һ�����,ȡ������ֶ�,Ԫ��)��ӵ�������,
										            ����:var array=[1,2],user={name:"me",age:11},list=[11,23];
										                array=merge(array,user,list);
										                ���:array=[1,2,"me",11,11,23]
										            2.�����һ�������Ƕ���,�ͻ�Ѻ������(��������һ�����,ȡ������ֶ�,Ԫ��)���û��滻��������ֶ���,
										            ����:var array=[1,2],user={name:"me",age:11},obj={result:"yes"};
										                user=merge(user,array,obj);
										                ���:user={name:"me",age:11,result:"yes",0:1,1:2}
										    
            
            map(array, callback)//�ϲ���������
            serialize(array)
            serializeArray(array)
            grep(source, callback)//����
            
            param(source)/*�Ѷ���ƴ�� name=ccc&age=13����http�����ַ���*/
            stringify(json)//��json����ת��Ϊ�ַ���
            parseJSON(jsonString) //��json�ַ���ת��Ϊjson����
           
            time(diff) /* ȡ�õ�ǰʱ��,��λ����,diffʱ���(��λ����),�û����ϵ�ǰʱ��,�ɸ� */
            delay(fun,timeout,[����1],[����2],...)//����setTimeout,��ͬ��,���fun��try cache,��ֹ���ӳ�ִ�б���,��ɷ���ֹͣ
            cycle(fun,timeout,[����1],[����2],...)//����setInterval,��ͬ��,���fun��try cache,��ֹ���ӳ�ִ�б���,��ɷ���ֹͣ
            toLower(str)//ת��ΪСд
            toUpper(str)//ת��Ϊ��д

Qmiks.Server.WebSocket.js //WebSocket������ʵ����
Qmiks.Server.Http.js //http����ʵ����
Qmiks.Server.createHttp();//����http����
Qmiks.Server.createWebSocket();//����WebSocket����