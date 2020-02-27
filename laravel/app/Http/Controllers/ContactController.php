<?php

namespace App\Http\Controllers;

use App\Models\ContactModel;
use Illuminate\Http\Request;
use App\Http\Requests\ContactRequest;

class ContactController extends Controller
{
    public function submitAction(ContactRequest $req)
    {
        $contact = new ContactModel();
        $contact->name = $req->input('name');
        $contact->email = $req->input('email');
        $contact->subject = $req->input('subject');
        $contact->message = $req->input('message');
        $contact->save();

        return redirect()->route('home')->with('success', 'Message has been added.');
    }

    public function allData()
    {
        $contact = new ContactModel();
        return view('messages', ['data' => $contact->all()]);
//        return view('messages', ['data' => $contact->orderBy('id', 'desc')->skip(1)->take(1)->get()]);
//        return view('messages', ['data' => $contact->inRandomOrder()->get()]);
    }

    public function viewContact($id)
    {
        $contact = ContactModel::find($id);
        return view('contact.view', ['contact' => $contact]);
    }

    public function updateContact($id)
    {
        $contact = ContactModel::find($id);
        return view('contact.update', ['contact' => $contact]);
    }

    public function saveUpdateContact($id, ContactRequest $req)
    {
        $contact = ContactModel::find($id);
        $contact->name = $req->input('name');
        $contact->email = $req->input('email');
        $contact->subject = $req->input('subject');
        $contact->message = $req->input('message');
        $contact->save();

        return redirect()->route('contact-view', $contact->id)->with('success', 'Contact has been updated.');
    }

    public function deleteContact($id)
    {
        $contact = ContactModel::find($id);
        $contact->delete();
        return redirect()->route('contact-all')->with('success', 'Contact has been deleted with id = ' . $contact->id . '.');
    }
}
